import React from 'react';
import {
  BookOpen,
  Award,
  Calculator,
  User,
  Activity,
  Flame,
  FileCheck2,
  ChevronDown,
  Sun,
  Moon
} from 'lucide-react';
import { UserProfile, UserProgressData } from '../types/dialysis';
import { calculateOverallProgress } from '../services/storageService';
import { useTheme } from '../context/ThemeContext';

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
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
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
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
                  Dialisi<span className="text-teal-600 dark:text-teal-400">Learn</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 px-2 py-0.5 rounded-full border border-teal-200 dark:border-teal-800 hidden sm:inline-block">
                  Modul IPDI 2021
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden md:block">
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
                  ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Materi (9 Bab)</span>
            </button>

            <button
              onClick={() => setActiveView('calculators')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeView === 'calculators'
                  ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Kalkulator Klinis</span>
            </button>

            <button
              onClick={() => setActiveView('dashboard')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeView === 'dashboard'
                  ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Progres Belajar</span>
            </button>

            <button
              onClick={onOpenExam}
              className="px-3.5 py-2 rounded-xl text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/50 hover:bg-teal-100 dark:hover:bg-teal-900/60 border border-teal-200 dark:border-teal-800 transition-colors flex items-center space-x-1.5 cursor-pointer ml-1"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Simulasi Ujian</span>
            </button>
          </nav>

          {/* Right Area: Theme Toggle + Progress Pill + User Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-400 transition-all cursor-pointer"
              title={theme === 'dark' ? 'Ganti ke Mode Terang (Light Mode)' : 'Ganti ke Mode Gelap (Dark Mode)'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Quick Progress Mini-Pill */}
            <div
              onClick={() => setActiveView('dashboard')}
              className="hidden sm:flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer transition-colors"
              title="Klik untuk membuka detail progres belajar Anda"
            >
              <div className="w-14 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-teal-600 dark:bg-teal-500 h-2 rounded-full transition-all"
                  style={{ width: `${stats.overallPercentage}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                {stats.overallPercentage}%
              </span>
            </div>

            {/* Streak */}
            <div
              className="flex items-center space-x-1 text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 px-2.5 py-1.5 rounded-xl"
              title="Hari aktif belajar berturut-turut"
            >
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{progress.streakDays || 1}</span>
            </div>

            {/* User Profile Button */}
            <button
              onClick={onOpenProfile}
              className="flex items-center space-x-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-teal-400 dark:hover:border-teal-500 bg-slate-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-750 transition-all cursor-pointer"
            >
              <div
                className="w-7 h-7 rounded-lg text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs"
                style={{ backgroundColor: user.avatarColor || '#0d9488' }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-left hidden sm:block min-w-0">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[110px]">
                  {user.name}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[110px]">
                  {user.title}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex lg:hidden items-center justify-around py-2 border-t border-slate-100 dark:border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveView('chapters')}
            className={`py-1.5 px-2 rounded-lg flex items-center space-x-1 ${
              activeView === 'chapters' || activeView === 'chapter-detail'
                ? 'text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Materi</span>
          </button>
          <button
            onClick={() => setActiveView('calculators')}
            className={`py-1.5 px-2 rounded-lg flex items-center space-x-1 ${
              activeView === 'calculators'
                ? 'text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Kalkulator</span>
          </button>
          <button
            onClick={() => setActiveView('dashboard')}
            className={`py-1.5 px-2 rounded-lg flex items-center space-x-1 ${
              activeView === 'dashboard'
                ? 'text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Progres</span>
          </button>
          <button
            onClick={onOpenExam}
            className="py-1.5 px-2 rounded-lg text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 flex items-center space-x-1"
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Ujian</span>
          </button>
        </div>
      </div>
    </header>
  );
};
