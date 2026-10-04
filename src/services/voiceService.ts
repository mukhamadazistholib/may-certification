/**
 * Voice Narration Service using Web Speech Synthesis API
 * Fine-tuned for Google Translate Indonesian natural speech & medical phonetics
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
  selectedVoiceURI: string | null;
}

type StateListener = (state: VoiceState) => void;

class VoiceService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private chunks: string[] = [];
  private currentChunk = 0;
  private listeners: Set<StateListener> = new Set();
  private availableVoices: SpeechSynthesisVoice[] = [];
  private state: VoiceState = {
    isPlaying: false,
    isPaused: false,
    rate: 0.95, // natural cadence for Indonesian Google voice
    pitch: 1.0,
    currentText: '',
    currentChapterId: null,
    currentChunkIndex: 0,
    totalChunks: 0,
    selectedVoiceURI: null,
  };
  private onFinishedCallback: (() => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.availableVoices = this.synth.getVoices();
    if (!this.state.selectedVoiceURI) {
      const best = this.findBestIndonesianVoice();
      if (best) {
        this.state.selectedVoiceURI = best.voiceURI;
        this.notify();
      }
    }
  }

  public getVoices(): SpeechSynthesisVoice[] {
    return this.availableVoices;
  }

  public getIndonesianVoices(): SpeechSynthesisVoice[] {
    return this.availableVoices.filter(
      (v) =>
        v.lang.toLowerCase().startsWith('id') ||
        v.lang.toLowerCase().includes('id_id') ||
        v.name.toLowerCase().includes('indonesia')
    );
  }

  public setSelectedVoiceURI(uri: string) {
    this.state.selectedVoiceURI = uri;
    this.notify();
  }

  private findBestIndonesianVoice(): SpeechSynthesisVoice | null {
    if (this.availableVoices.length === 0 && this.synth) {
      this.availableVoices = this.synth.getVoices();
    }

    // 1. First priority: Google Bahasa Indonesia (the exact Google Translate voice!)
    const googleIndo = this.availableVoices.find(
      (v) =>
        (v.lang.startsWith('id') || v.lang.includes('ID')) &&
        (v.name.includes('Google') || v.name.includes('Indonesian'))
    );
    if (googleIndo) return googleIndo;

    // 2. Second priority: Any id-ID language voice
    const anyIndo = this.availableVoices.find(
      (v) => v.lang.startsWith('id') || v.lang.includes('ID')
    );
    if (anyIndo) return anyIndo;

    // 3. Third priority: Microsoft Natural / Apple Damayanti / Gadis
    const naturalVoice = this.availableVoices.find(
      (v) => v.name.includes('Natural') || v.name.includes('Online')
    );
    if (naturalVoice) return naturalVoice;

    return this.availableVoices[0] || null;
  }

  public getSelectedVoice(): SpeechSynthesisVoice | null {
    if (this.state.selectedVoiceURI) {
      const found = this.availableVoices.find(
        (v) => v.voiceURI === this.state.selectedVoiceURI
      );
      if (found) return found;
    }
    return this.findBestIndonesianVoice();
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

  /**
   * Phonetically normalize clinical medical terms into smooth Indonesian pronunciation
   * Prevents robotic stuttering or awkward spelling of medical abbreviations.
   */
  public normalizeForIndonesianSpeech(text: string): string {
    let s = text;

    // Expand clinical units & symbols
    s = s.replace(/(\d+)\s*ml\/mnt/gi, '$1 mililiter per menit');
    s = s.replace(/(\d+)\s*ml\/menit/gi, '$1 mililiter per menit');
    s = s.replace(/(\d+)\s*ml\/jam/gi, '$1 mililiter per jam');
    s = s.replace(/(\d+)\s*mg\/dL/gi, '$1 miligram per desiliter');
    s = s.replace(/(\d+)\s*mEq\/L/gi, '$1 mili ekuivalen per liter');
    s = s.replace(/(\d+)\s*mmol\/L/gi, '$1 milimol per liter');
    s = s.replace(/(\d+)\s*ug\/L/gi, '$1 mikrogram per liter');
    s = s.replace(/(\d+)\s*ng\/ml/gi, '$1 nanogram per mililiter');
    s = s.replace(/(\d+)\s*CFU\/ml/gi, '$1 C F U per mililiter');
    s = s.replace(/(\d+)\s*EU\/ml/gi, '$1 E U per mililiter');
    s = s.replace(/(\d+)\s*kgBB/gi, '$1 kilogram berat badan');
    s = s.replace(/(\d+)\s*mmHg/gi, '$1 milimeter air raksa');
    s = s.replace(/(\d+)\s*%/g, '$1 persen');
    s = s.replace(/(\d+)\s*°C/g, '$1 derajat Celsius');
    s = s.replace(/(\d+)\s*oC/g, '$1 derajat Celsius');

    // Symbols
    s = s.replace(/≥/g, ' minimal ');
    s = s.replace(/≤/g, ' maksimal ');
    s = s.replace(/>/g, ' lebih dari ');
    s = s.replace(/</g, ' kurang dari ');
    s = s.replace(/±/g, ' kurang lebih ');
    s = s.replace(/\+/g, ' tambah ');
    s = s.replace(/(\d+)\s*x\/minggu/gi, '$1 kali seminggu');
    s = s.replace(/(\d+)\s*x\/hari/gi, '$1 kali sehari');

    // Clinical acronyms spelled out naturally
    s = s.replace(/\bCa\s*×\s*P\b/gi, 'Kalsium kali Fosfat');
    s = s.replace(/\bCa\s*x\s*P\b/gi, 'Kalsium kali Fosfat');
    s = s.replace(/\bKt\/V\b/gi, 'K T per V');
    s = s.replace(/\bURR\b/g, 'U R R');
    s = s.replace(/\bAVF\b/g, 'A V Fistula');
    s = s.replace(/\bAVG\b/g, 'A V Graft');
    s = s.replace(/\bCVC\b/g, 'C V C');
    s = s.replace(/\bSLED\b/g, 'Sled');
    s = s.replace(/\bSLEDD\b/g, 'Sled');
    s = s.replace(/\bPIRRT\b/g, 'Pirt');
    s = s.replace(/\bCRRT\b/g, 'C R R T');
    s = s.replace(/\bIHD\b/g, 'I H D');
    s = s.replace(/\bTCV\b/g, 'T C V');
    s = s.replace(/\bRO\b/g, 'R O');
    s = s.replace(/\bEBCT\b/g, 'E B C T');
    s = s.replace(/\bAAMI\b/g, 'A A M I');
    s = s.replace(/\bKDOQI\b/g, 'K-D-O-Q-I');
    s = s.replace(/\bPERNEFRI\b/g, 'Pernefri');
    s = s.replace(/\bIPDI\b/g, 'I P D I');
    s = s.replace(/\bKDIGO\b/g, 'K-Digo');
    s = s.replace(/\bADQI\b/g, 'A-D-Q-I');
    s = s.replace(/\bRIFLE\b/g, 'Rifle');
    s = s.replace(/\bESA\b/g, 'E S A');
    s = s.replace(/\bEPO\b/g, 'E P O');
    s = s.replace(/\bPRCA\b/g, 'P R C A');
    s = s.replace(/\bHIT\b/g, 'H I T');
    s = s.replace(/\bDDS\b/g, 'D D S');
    s = s.replace(/\bPET\b/g, 'P E T');
    s = s.replace(/\bSGA\b/g, 'S G A');
    s = s.replace(/\bMIS\b/g, 'M I S');
    s = s.replace(/\bLILA\b/g, 'Lila');
    s = s.replace(/\bIDWG\b/g, 'I D W G');
    s = s.replace(/\bUFR\b/g, 'U F R');
    s = s.replace(/\bTMP\b/g, 'T M P');
    s = s.replace(/\bKUF\b/g, 'Kuf');
    s = s.replace(/\bQb\b/g, 'Q B');
    s = s.replace(/\bQd\b/g, 'Q D');
    s = s.replace(/\bNaCl\s*0,9%/gi, 'Natrium Klorida nol koma sembilan persen');
    s = s.replace(/\bNaCl\s*0\.9%/gi, 'Natrium Klorida nol koma sembilan persen');
    s = s.replace(/\bNaCl\b/gi, 'Natrium Klorida');
    s = s.replace(/\bETO\b/g, 'E T O');

    // Decimal numbers: 0.3 -> 0 koma 3
    s = s.replace(/(\d+)\.(\d+)/g, '$1 koma $2');

    return s;
  }

  private splitIntoChunks(text: string): string[] {
    const clean = text.replace(/[\r\n]+/g, ' ').trim();
    // Split on period, question mark, exclamation, or semicolon followed by space
    const sentences = clean.match(/[^.!?]+[.!?]+|\s*[^.!?]+$/g) || [clean];
    const filtered = sentences.map((s) => s.trim()).filter((s) => s.length > 0);
    return filtered.length > 0 ? filtered : [clean];
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

    const rawChunk = this.chunks[this.currentChunk];
    const normalizedText = this.normalizeForIndonesianSpeech(rawChunk);

    const utterance = new SpeechSynthesisUtterance(normalizedText);
    const selectedVoice = this.getSelectedVoice();

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
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
