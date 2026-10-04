import React, { useEffect, useState } from 'react';
import { Play, Pause, Square, Volume2, FastForward, ChevronUp, ChevronDown, Settings2, Sparkles } from 'lucide-react';
import { voiceService, VoiceState } from '../services/voiceService';
import { getChapterById } from '../data/allChapters';

interface AudioPlayerBarProps {
  onChapterSelect?: (id: number) => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({ onChapterSelect }) => {
  const [voiceState, setVoiceState] = useState<VoiceState>(voiceService.getState());
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showVoiceSettings, setShowVoiceSettings] = useState<boolean>(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const unsubscribe = voiceService.subscribe((newState) => {
      setVoiceState(newState);
      setAvailableVoices(voiceService.getVoices());
    });
    return unsubscribe;
  }, []);

  if (!voiceState.isPlaying && !voiceState.isPaused) {
    return null;
  }

  const currentChapter = voiceState.currentChapterId
    ? getChapterById(voiceState.currentChapterId)
    : null;

  const cycleSpeed = () => {
    const current = voiceState.rate;
    let next = 1.0;
    if (current === 1.0) next = 1.25;
    else if (current === 1.25) next = 0.85;
    else if (current === 0.85) next = 1.0;
    else next = 1.0;
    voiceService.setRate(next);
  };

  const indonesianVoices = voiceService.getIndonesianVoices();
  const selectedVoice = voiceService.getSelectedVoice();

  const progressPercent =
    voiceState.totalChunks > 0
      ? Math.round(((voiceState.currentChunkIndex + 1) / voiceState.totalChunks) * 100)
      : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md text-white border-t border-slate-700 shadow-2xl transition-all">
      {/* Progress line */}
      <div className="w-full bg-slate-800 h-1">
        <div
          className="bg-teal-400 h-1 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          {/* Chapter Info */}
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 shrink-0">
              <Volume2 className="w-5 h-5 animate-pulse" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-300 bg-teal-950/80 px-2.5 py-0.5 rounded border border-teal-700/60 flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-teal-400 inline" />
                  <span>Materi Wajib Diingat</span>
                </span>
                {currentChapter && (
                  <button
                    onClick={() => onChapterSelect && onChapterSelect(currentChapter.id)}
                    className="text-xs text-slate-300 hover:text-white truncate font-medium underline-offset-2 hover:underline cursor-pointer"
                  >
                    {currentChapter.romanNumeral}: {currentChapter.title}
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-400 truncate mt-0.5 flex items-center space-x-2">
                <span>
                  {voiceState.isPlaying && !voiceState.isPaused
                    ? `Menarasikan poin ${voiceState.currentChunkIndex + 1} dari ${voiceState.totalChunks}...`
                    : 'Audio dijeda (Paused)'}
                </span>
                {selectedVoice && (
                  <span className="text-[10px] text-teal-300/80 bg-slate-800 px-2 py-0.2 rounded border border-slate-700 hidden sm:inline-block">
                    Suara: {selectedVoice.name.replace(/Google|Microsoft|Desktop|Natural/g, '').trim() || 'Google Bahasa Indonesia'}
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* Voice Settings Dropdown button */}
            <button
              onClick={() => setShowVoiceSettings(!showVoiceSettings)}
              title="Pengaturan Suara / Pilihan Voice"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 transition-colors"
            >
              <Settings2 className="w-4 h-4" />
            </button>

            {/* Speed toggle */}
            <button
              onClick={cycleSpeed}
              title="Atur Kecepatan Suara"
              className="text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-teal-300 px-2.5 py-1.5 rounded-lg border border-slate-700 flex items-center space-x-1"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>{voiceState.rate}x</span>
            </button>

            {/* Play/Pause */}
            <button
              onClick={() => voiceService.togglePlayPause()}
              className="w-10 h-10 rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center justify-center font-bold shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              {voiceState.isPlaying && !voiceState.isPaused ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            {/* Stop */}
            <button
              onClick={() => voiceService.stop()}
              title="Hentikan Narasi"
              className="p-2 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700 transition-colors cursor-pointer"
            >
              <Square className="w-4 h-4 fill-current" />
            </button>

            {/* Expand / Collapse read-along text */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              title={isExpanded ? 'Tutup teks naskah' : 'Lihat teks yang sedang dibacakan'}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Voice Selection Settings Panel */}
        {showVoiceSettings && (
          <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-teal-400 block mb-0.5">Pilihan Suara Audio Bahasa Indonesia:</span>
              <span className="text-slate-400 text-[11px]">
                Secara otomatis mengutamakan Google Bahasa Indonesia (suara jernih dan fasih mirip Google Translate).
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={selectedVoice?.voiceURI || ''}
                onChange={(e) => voiceService.setSelectedVoiceURI(e.target.value)}
                className="bg-slate-900 text-white text-xs border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-teal-400"
              >
                {indonesianVoices.length > 0 ? (
                  indonesianVoices.map((v) => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      {v.name} ({v.lang})
                    </option>
                  ))
                ) : (
                  <option value="">Default Voice (Sistem Otomatis)</option>
                )}
              </select>
              <button
                onClick={() => setShowVoiceSettings(false)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
              >
                Tutup
              </button>
            </div>
          </div>
        )}

        {/* Expandable Read-along Narration Box */}
        {isExpanded && (
          <div className="mt-2 pt-2 border-t border-slate-800 text-xs text-slate-300 max-h-36 overflow-y-auto leading-relaxed font-sans bg-slate-950/70 p-3 rounded-lg border border-slate-800">
            <span className="font-semibold text-teal-400 block mb-1">Naskah Materi Inti Yang Dinarasikan:</span>
            <p className="text-slate-200 leading-relaxed">{voiceState.currentText}</p>
          </div>
        )}
      </div>
    </div>
  );
};
