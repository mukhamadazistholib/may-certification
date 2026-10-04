import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ChapterList } from './components/ChapterList';
import { ChapterDetail } from './components/ChapterDetail';
import { ClinicalCalculators } from './components/ClinicalCalculators';
import { ProgressDashboard } from './components/ProgressDashboard';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { GrandExamModal } from './components/GrandExamModal';
import { CertificateModal } from './components/CertificateModal';
import { ProfileModal } from './components/ProfileModal';
import { allChapters, getChapterById } from './data/allChapters';
import { Chapter } from './types/dialysis';
import { voiceService } from './services/voiceService';
import {
  getActiveProfile,
  getUserProgress,
  addStudyTime,
  calculateOverallProgress
} from './services/storageService';

export default function App() {
  const [activeView, setActiveView] = useState<'chapters' | 'chapter-detail' | 'calculators' | 'dashboard'>('chapters');
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);
  const [user, setUser] = useState(getActiveProfile());
  const [progress, setProgress] = useState(getUserProgress(user.id));

  // Modals
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isExamOpen, setIsExamOpen] = useState<boolean>(false);
  const [isCertOpen, setIsCertOpen] = useState<boolean>(false);

  // Sync user & progress on mount or change
  const refreshUserAndProgress = () => {
    const curUser = getActiveProfile();
    setUser(curUser);
    setProgress(getUserProgress(curUser.id));
  };

  useEffect(() => {
    refreshUserAndProgress();
  }, []);

  // Track study time every 60 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      addStudyTime(user.id, 1);
      setProgress(getUserProgress(user.id));
    }, 60000);
    return () => clearInterval(timer);
  }, [user.id]);

  const handleSelectChapter = (id: number) => {
    setSelectedChapterId(id);
    setActiveView('chapter-detail');
  };

  const handlePlayVoiceDirect = (chapter: Chapter) => {
    voiceService.play(chapter.voiceSummary, chapter.id);
  };

  const selectedChapter = getChapterById(selectedChapterId) || allChapters[0];
  const stats = calculateOverallProgress(progress);

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans">
      {/* Navigation Top Header */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        user={user}
        progress={progress}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenExam={() => setIsExamOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-8 pb-36 sm:pb-40">
        {activeView === 'chapters' && (
          <div className="space-y-6">
            {/* Intro Welcome Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
              <div className="max-w-2xl">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 inline-block mb-2 sm:mb-3">
                  Panduan Belajar Mandiri Resertifikasi IPDI
                </span>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                  Modul Resertifikasi Perawat Dialisis Indonesia
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Pelajari 9 unit kompetensi klinis dialisis terstandar PP IPDI lengkap dengan pemetaan materi per bab, audio voice narasi suara interaktif, rangkuman poin kritis keselamatan pasien, kuis pemahaman, dan kalkulator klinis.
                </p>
              </div>

              <div className="flex flex-row flex-wrap sm:flex-nowrap gap-2 sm:gap-3 shrink-0">
                <button
                  onClick={() => setActiveView('calculators')}
                  className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-colors cursor-pointer text-center"
                >
                  Kalkulator Klinis
                </button>
                <button
                  onClick={() => setIsExamOpen(true)}
                  className="flex-1 sm:flex-none px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md transition-transform active:scale-95 cursor-pointer text-center"
                >
                  Simulasi Ujian
                </button>
              </div>
            </div>

            {/* Chapters Grid View */}
            <ChapterList
              progress={progress}
              onSelectChapter={handleSelectChapter}
              onPlayVoiceDirect={handlePlayVoiceDirect}
            />
          </div>
        )}

        {activeView === 'chapter-detail' && (
          <ChapterDetail
            chapter={selectedChapter}
            userId={user.id}
            onNavigateChapter={(id) => setSelectedChapterId(id)}
            onBackToList={() => setActiveView('chapters')}
          />
        )}

        {activeView === 'calculators' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-slate-900">
                Kalkulator Klinis Hemodialisa
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Instrumen bantu praktis perhitungan adekuasi dialisis, ultrafiltrasi, keseimbangan mineral, dan persiapan akses.
              </p>
            </div>
            <ClinicalCalculators />
          </div>
        )}

        {activeView === 'dashboard' && (
          <ProgressDashboard
            user={user}
            progress={progress}
            onSelectChapter={handleSelectChapter}
            onOpenExam={() => setIsExamOpen(true)}
            onOpenCertificate={() => setIsCertOpen(true)}
          />
        )}
      </main>

      {/* Floating Interactive Audio Player */}
      <AudioPlayerBar onChapterSelect={handleSelectChapter} />

      {/* Grand Exam Simulation Modal */}
      <GrandExamModal
        userId={user.id}
        isOpen={isExamOpen}
        onClose={() => {
          setIsExamOpen(false);
          refreshUserAndProgress();
        }}
        onFinished={refreshUserAndProgress}
      />

      {/* Certificate Modal */}
      <CertificateModal
        user={user}
        overallScore={stats.averageQuizScore || 85}
        completedDate={new Date().toISOString()}
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
      />

      {/* Profile Management Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onProfileChanged={refreshUserAndProgress}
      />
    </div>
  );
}
