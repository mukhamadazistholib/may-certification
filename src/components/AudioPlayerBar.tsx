import React, { useEffect, useState } from 'react';
import { Play, Pause, Square, Volume2, FastForward, ChevronUp, ChevronDown } from 'lucide-react';
import { voiceService, VoiceState } from '../services/voiceService';
import { getChapterById } from '../data/allChapters';

interface AudioPlayerBarProps {
  onChapterSelect?: (id: number) => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({ onChapterSelect }) => {
  const [voiceState, setVoiceState] = useState<VoiceState>(voiceService.getState());
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = voiceService.subscribe((newState) => {
      setVoiceState(newState);
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
    else if (current === 1.25) next = 1.5;
    else if (current === 1.5) next = 0.8;
    else next = 1.0;
    voiceService.setRate(next);
  };

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
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800/50">
                  Audio Tutor IPDI
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
              <p className="text-xs text-slate-400 truncate mt-0.5">
                {voiceState.isPlaying && !voiceState.isPaused
                  ? 'Sedang menarasikan ringkasan penting bab...'
                  : 'Audio dijeda (Paused)'}
              </p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
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
              className="w-10 h-10 rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center justify-center font-bold shadow-lg transition-transform active:scale-95"
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
              className="p-2 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700 transition-colors"
            >
              <Square className="w-4 h-4 fill-current" />
            </button>

            {/* Expand / Collapse read-along text */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
              title={isExpanded ? 'Tutup teks narasi' : 'Lihat teks yang sedang dibacakan'}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Expandable Read-along Narration Box */}
        {isExpanded && (
          <div className="mt-2 pt-2 border-t border-slate-800 text-xs text-slate-300 max-h-32 overflow-y-auto leading-relaxed font-sans bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <span className="font-semibold text-teal-400 block mb-1">Teks Suara (Audio Narration Script):</span>
            <p className="italic text-slate-200">{voiceState.currentText}</p>
          </div>
        )}
      </div>
    </div>
  );
};
