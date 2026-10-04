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
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari materi, konsep, istilah klinis (mis: Heparin, Rule of 6, TCV, Peritonitis, Kloramin)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-teal-500 placeholder:text-slate-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-semibold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center overflow-x-auto pb-1 md:pb-0 gap-1.5 text-xs font-semibold shrink-0">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              filterCategory === 'all'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua (9 Bab)
          </button>
          <button
            onClick={() => setFilterCategory('dasar')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              filterCategory === 'dasar'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Dasar & Pre-HD
          </button>
          <button
            onClick={() => setFilterCategory('akep')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              filterCategory === 'akep'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Intra & Post-HD
          </button>
          <button
            onClick={() => setFilterCategory('komplikasi')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              filterCategory === 'komplikasi'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            SLED & Jangka Panjang
          </button>
          <button
            onClick={() => setFilterCategory('capd_wt')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              filterCategory === 'capd_wt'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            CAPD, Reuse & Water
          </button>
          <button
            onClick={() => setFilterCategory('bookmarked')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center space-x-1 ${
              filterCategory === 'bookmarked'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
              className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md hover:border-teal-500/50 transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6">
                {/* Top Badge & Page Range */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-200">
                      {chapter.romanNumeral}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">
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
                  className="font-bold text-slate-800 text-base group-hover:text-teal-700 transition-colors cursor-pointer mb-1 leading-snug line-clamp-2"
                >
                  {chapter.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                  {chapter.subtitle}
                </p>

                {/* Status Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 text-[11px]">
                  {isRead ? (
                    <span className="inline-flex items-center text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium border border-emerald-200">
                      <CheckCircle className="w-3 h-3 mr-1" /> Materi Selesai
                    </span>
                  ) : (
                    <span className="text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
                      Belum Selesai
                    </span>
                  )}

                  {isPassed ? (
                    <span className="inline-flex items-center text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md font-bold border border-teal-200">
                      Kuis: {score}% (Lulus)
                    </span>
                  ) : score !== null && score !== undefined ? (
                    <span className="inline-flex items-center text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-bold border border-amber-200">
                      Kuis: {score}%
                    </span>
                  ) : null}

                  {isAudio && (
                    <span className="inline-flex items-center text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md font-medium border border-blue-200">
                      <Volume2 className="w-3 h-3 mr-1" /> Audio Selesai
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Card Action Footer */}
              <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                {/* Direct Audio Play Button */}
                <button
                  onClick={() => onPlayVoiceDirect(chapter)}
                  className="font-semibold text-slate-700 hover:text-teal-700 flex items-center space-x-1.5 transition-colors cursor-pointer py-1"
                >
                  <Volume2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>Play Voice</span>
                </button>

                {/* Open Chapter */}
                <button
                  onClick={() => onSelectChapter(chapter.id)}
                  className="font-bold text-teal-700 hover:text-teal-900 flex items-center space-x-1 transition-colors cursor-pointer py-1"
                >
                  <span>Buka Bab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredChapters.length === 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="font-bold text-slate-700 text-base">Tidak ada materi yang cocok</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Coba gunakan kata kunci pencarian lain atau pilih kategori Semua Bab.
          </p>
        </div>
      )}
    </div>
  );
};
