/**
 * Voice Narration Service using Web Speech Synthesis API
 * Specially tuned for Indonesian medical terminology & smooth chunking
 */

export interface VoiceState {
  isPlaying: boolean;
  isPaused: boolean;
  rate: number;
  pitch: number;
  currentText: string;
  currentChapterId: number | null;
  currentChunkIndex: number;
  totalChunks: number;
}

type StateListener = (state: VoiceState) => void;

class VoiceService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private chunks: string[] = [];
  private currentChunk = 0;
  private listeners: Set<StateListener> = new Set();
  private state: VoiceState = {
    isPlaying: false,
    isPaused: false,
    rate: 1.0,
    pitch: 1.0,
    currentText: '',
    currentChapterId: null,
    currentChunkIndex: 0,
    totalChunks: 0,
  };
  private onFinishedCallback: (() => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public isSupported(): boolean {
    return this.synth !== null;
  }

  public subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener({ ...this.state }));
  }

  private splitIntoChunks(text: string): string[] {
    // Clean text and split by punctuation into manageable sentences
    const clean = text.replace(/[\r\n]+/g, ' ').trim();
    const sentenceRegex = /[^.!?]+[.!?]+|\s*[^.!?]+$/g;
    const matches = clean.match(sentenceRegex) || [clean];
    const filtered = matches.map((s) => s.trim()).filter((s) => s.length > 0);
    return filtered.length > 0 ? filtered : [clean];
  }

  private getIndonesianVoice(): SpeechSynthesisVoice | null {
    if (!this.synth) return null;
    const voices = this.synth.getVoices();
    // 1. Try to find Indonesian
    const idVoice = voices.find(
      (v) => v.lang.startsWith('id') || v.lang.includes('ID')
    );
    if (idVoice) return idVoice;
    // 2. Fallback to Google or default natural voice
    const naturalVoice = voices.find((v) => v.name.includes('Natural') || v.name.includes('Google'));
    if (naturalVoice) return naturalVoice;
    return voices[0] || null;
  }

  public play(text: string, chapterId: number | null = null, onFinish?: () => void) {
    if (!this.synth) return;

    this.stop();
    this.chunks = this.splitIntoChunks(text);
    this.currentChunk = 0;
    this.onFinishedCallback = onFinish || null;

    this.state = {
      ...this.state,
      isPlaying: true,
      isPaused: false,
      currentText: text,
      currentChapterId: chapterId,
      currentChunkIndex: 0,
      totalChunks: this.chunks.length,
    };
    this.notify();

    this.speakCurrentChunk();
  }

  private speakCurrentChunk() {
    if (!this.synth || this.currentChunk >= this.chunks.length) {
      this.finish();
      return;
    }

    const chunkText = this.chunks[this.currentChunk];
    const utterance = new SpeechSynthesisUtterance(chunkText);
    const voice = this.getIndonesianVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = 'id-ID';
    }

    utterance.rate = this.state.rate;
    utterance.pitch = this.state.pitch;

    utterance.onend = () => {
      this.currentChunk++;
      if (this.currentChunk < this.chunks.length && this.state.isPlaying) {
        this.state.currentChunkIndex = this.currentChunk;
        this.notify();
        this.speakCurrentChunk();
      } else {
        this.finish();
      }
    };

    utterance.onerror = (e) => {
      // Ignore user-initiated cancels
      if (e.error === 'canceled' || e.error === 'interrupted') return;
      console.warn('Speech error:', e);
      this.finish();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.state.isPlaying && !this.state.isPaused) {
      this.synth.pause();
      this.state.isPaused = true;
      this.notify();
    }
  }

  public resume() {
    if (this.synth && this.state.isPlaying && this.state.isPaused) {
      this.synth.resume();
      this.state.isPaused = false;
      this.notify();
    }
  }

  public togglePlayPause() {
    if (this.state.isPaused) {
      this.resume();
    } else if (this.state.isPlaying) {
      this.pause();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.currentUtterance = null;
    this.state = {
      ...this.state,
      isPlaying: false,
      isPaused: false,
      currentText: '',
      currentChapterId: null,
      currentChunkIndex: 0,
      totalChunks: 0,
    };
    this.notify();
  }

  public setRate(rate: number) {
    this.state.rate = rate;
    this.notify();
    if (this.state.isPlaying) {
      // Restart current chunk with new rate
      const currentCh = this.currentChunk;
      if (this.synth) this.synth.cancel();
      this.currentChunk = currentCh;
      this.speakCurrentChunk();
    }
  }

  private finish() {
    const callback = this.onFinishedCallback;
    this.stop();
    if (callback) {
      callback();
    }
  }

  public getState(): VoiceState {
    return this.state;
  }
}

export const voiceService = new VoiceService();
