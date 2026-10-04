import React from 'react';
import {
  BookOpen,
  Award,
  Calculator,
  User,
  Activity,
  Flame,
  FileCheck2,
  ChevronDown
} from 'lucide-react';
import { UserProfile, UserProgressData } from '../types/dialysis';
import { calculateOverallProgress } from '../services/storageService';

interface NavbarProps {
  activeView: 'chapters' | 'chapter-detail' | 'calculators' | 'dashboard';
  setActiveView: (view: 'chapters' | 'chapter-detail' | 'calculators' | 'dashboard') => void;
  user: UserProfile;
  progress: UserProgressData;
  onOpenProfile: () => void;
  onOpenExam: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  user,
  progress,
  onOpenProfile,
  onOpenExam,
}) => {
  const stats = calculateOverallProgress(progress);

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveView('chapters')}
            className="flex items-center space-x-3 cursor-pointer shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-700 to-cyan-500 text-white flex items-center justify-center shadow-md">
              <Activity className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900">
                  Dialisi<span className="text-teal-600">Learn</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-800 px-2 py-0.5 rounded-full border border-teal-200 hidden sm:inline-block">
                  Modul IPDI 2021
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden md:block">
                Resertifikasi Perawat Dialisis Indonesia
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 text-xs font-bold">
            <button
              onClick={() => setActiveView('chapters')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeView === 'chapters' || activeView === 'chapter-detail'
                  ? 'bg-teal-50 text-teal-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Materi (9 Bab)</span>
            </button>

            <button
              onClick={() => setActiveView('calculators')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeView === 'calculators'
                  ? 'bg-teal-50 text-teal-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Kalkulator Klinis</span>
            </button>

            <button
              onClick={() => setActiveView('dashboard')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeView === 'dashboard'
                  ? 'bg-teal-50 text-teal-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Progres Belajar</span>
            </button>

            <button
              onClick={onOpenExam}
              className="px-3.5 py-2 rounded-xl text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-colors flex items-center space-x-1.5 cursor-pointer ml-1"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Simulasi Ujian</span>
            </button>
          </nav>

          {/* Right Area: Progress Pill + User Profile */}
          <div className="flex items-center space-x-3 shrink-0">
            {/* Quick Progress Mini-Pill */}
            <div
              onClick={() => setActiveView('dashboard')}
              className="hidden sm:flex items-center space-x-2 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-xl border border-slate-200 cursor-pointer transition-colors"
              title="Klik untuk membuka detail progres belajar Anda"
            >
              <div className="w-14 bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-teal-600 h-2 rounded-full transition-all"
                  style={{ width: `${stats.overallPercentage}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-slate-800">
                {stats.overallPercentage}%
              </span>
            </div>

            {/* Streak */}
            <div
              className="flex items-center space-x-1 text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1.5 rounded-xl"
              title="Hari aktif belajar berturut-turut"
            >
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{progress.streakDays || 1}</span>
            </div>

            {/* User Profile Button */}
            <button
              onClick={onOpenProfile}
              className="flex items-center space-x-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 hover:border-teal-400 bg-slate-50 hover:bg-white transition-all cursor-pointer"
            >
              <div
                className="w-7 h-7 rounded-lg text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs"
                style={{ backgroundColor: user.avatarColor || '#0d9488' }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-left hidden sm:block min-w-0">
                <div className="text-xs font-bold text-slate-800 truncate max-w-[110px]">
                  {user.name}
                </div>
                <div className="text-[10px] text-slate-500 truncate max-w-[110px]">
                  {user.title}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex lg:hidden items-center justify-around py-2 border-t border-slate-100 text-xs font-bold">
          <button
            onClick={() => setActiveView('chapters')}
            className={`py-1.5 px-2 rounded-lg flex items-center space-x-1 ${
              activeView === 'chapters' || activeView === 'chapter-detail'
                ? 'text-teal-800 bg-teal-50'
                : 'text-slate-600'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Materi</span>
          </button>
          <button
            onClick={() => setActiveView('calculators')}
            className={`py-1.5 px-2 rounded-lg flex items-center space-x-1 ${
              activeView === 'calculators' ? 'text-teal-800 bg-teal-50' : 'text-slate-600'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Kalkulator</span>
          </button>
          <button
            onClick={() => setActiveView('dashboard')}
            className={`py-1.5 px-2 rounded-lg flex items-center space-x-1 ${
              activeView === 'dashboard' ? 'text-teal-800 bg-teal-50' : 'text-slate-600'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Progres</span>
          </button>
          <button
            onClick={onOpenExam}
            className="py-1.5 px-2 rounded-lg text-teal-700 bg-teal-50 flex items-center space-x-1"
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Ujian</span>
          </button>
        </div>
      </div>
    </header>
  );
};
