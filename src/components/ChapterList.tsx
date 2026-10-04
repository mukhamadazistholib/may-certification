import React, { useState } from 'react';
import {
  BookOpen,
  Volume2,
  CheckCircle,
  HelpCircle,
  Clock,
  ArrowRight,
  Search,
  Sparkles,
  Flame,
  Bookmark
} from 'lucide-react';
import { allChapters } from '../data/allChapters';
import { Chapter, UserProgressData } from '../types/dialysis';
import { voiceService } from '../services/voiceService';

interface ChapterListProps {
  progress: UserProgressData;
  onSelectChapter: (chapterId: number) => void;
  onPlayVoiceDirect: (chapter: Chapter) => void;
}

export const ChapterList: React.FC<ChapterListProps> = ({
  progress,
  onSelectChapter,
  onPlayVoiceDirect,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredChapters = allChapters.filter((ch) => {
    const matchesSearch =
      ch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ch.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ch.overview.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ch.subtopics.some((s) => s.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      ch.keyTakeaways.some((k) => k.title.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterCategory === 'dasar') return ch.id <= 2;
    if (filterCategory === 'akep') return ch.id === 3 || ch.id === 4;
    if (filterCategory === 'komplikasi') return ch.id === 5 || ch.id === 6;
    if (filterCategory === 'capd_wt') return ch.id >= 7;
    if (filterCategory === 'bookmarked') return !!progress.chapters[ch.id]?.bookmarked;

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter Header Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 transition-colors">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari materi, konsep, istilah klinis (mis: Heparin, Rule of 6, TCV, Peritonitis, Kloramin)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-2xl text-xs sm:text-sm focus:outline-teal-500 placeholder:text-slate-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-semibold cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center overflow-x-auto pb-1 md:pb-0 gap-1.5 text-xs font-semibold shrink-0 scrollbar-none">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              filterCategory === 'all'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Semua (9 Bab)
          </button>
          <button
            onClick={() => setFilterCategory('dasar')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              filterCategory === 'dasar'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Dasar & Pre-HD
          </button>
          <button
            onClick={() => setFilterCategory('akep')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              filterCategory === 'akep'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Intra & Post-HD
          </button>
          <button
            onClick={() => setFilterCategory('komplikasi')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              filterCategory === 'komplikasi'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            HD Khusus & Kronik
          </button>
          <button
            onClick={() => setFilterCategory('capd_wt')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              filterCategory === 'capd_wt'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            CAPD, Reuse & Water
          </button>
          <button
            onClick={() => setFilterCategory('bookmarked')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center space-x-1 ${
              filterCategory === 'bookmarked'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Tersimpan</span>
          </button>
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredChapters.map((chapter) => {
          const chProg = progress.chapters[chapter.id];
          const isRead = !!chProg?.isRead;
          const isAudio = !!chProg?.isAudioFinished;
          const isPassed = !!chProg?.quizPassed;
          const score = chProg?.quizScore;

          return (
            <div
              key={chapter.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-teal-500/50 dark:hover:border-teal-500/50 transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6">
                {/* Top Badge & Page Range */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                      {chapter.romanNumeral}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      {chapter.pageRange}
                    </span>
                  </div>

                  {chProg?.bookmarked && (
                    <span className="text-amber-500">
                      <Bookmark className="w-4 h-4 fill-current" />
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3
                  onClick={() => onSelectChapter(chapter.id)}
                  className="font-bold text-slate-800 dark:text-slate-100 text-base group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors cursor-pointer mb-1 leading-snug line-clamp-2"
                >
                  {chapter.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {chapter.subtitle}
                </p>

                {/* Status Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                  {isRead ? (
                    <span className="inline-flex items-center text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md font-medium border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle className="w-3 h-3 mr-1" /> Materi Selesai
                    </span>
                  ) : (
                    <span className="text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                      Belum Selesai
                    </span>
                  )}

                  {isPassed ? (
                    <span className="inline-flex items-center text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/50 px-2 py-0.5 rounded-md font-bold border border-teal-200 dark:border-teal-800">
                      Kuis: {score}% (Lulus)
                    </span>
                  ) : score !== undefined ? (
                    <span className="text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-md">
                      Kuis: {score}%
                    </span>
                  ) : null}

                  {isAudio && (
                    <span className="inline-flex items-center text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/50 px-2 py-0.5 rounded-md">
                      <Volume2 className="w-3 h-3 mr-1" /> Audio
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-slate-50/70 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => onPlayVoiceDirect(chapter)}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-950/60 border border-teal-200 dark:border-teal-800 transition-colors flex items-center space-x-1.5 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Dengar Rangkuman</span>
                </button>

                <button
                  onClick={() => onSelectChapter(chapter.id)}
                  className="px-3.5 py-2 bg-slate-800 dark:bg-slate-700 hover:bg-teal-600 dark:hover:bg-teal-600 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1 shadow-xs cursor-pointer"
                >
                  <span>Buka Bab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
