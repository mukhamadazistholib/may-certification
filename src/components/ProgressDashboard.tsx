import React from 'react';
import {
  Award,
  CheckCircle,
  Clock,
  BookOpen,
  Volume2,
  HelpCircle,
  Flame,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  Printer
} from 'lucide-react';
import { allChapters } from '../data/allChapters';
import { UserProfile, UserProgressData } from '../types/dialysis';
import { calculateOverallProgress } from '../services/storageService';

interface ProgressDashboardProps {
  user: UserProfile;
  progress: UserProgressData;
  onSelectChapter: (id: number) => void;
  onOpenExam: () => void;
  onOpenCertificate: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  user,
  progress,
  onSelectChapter,
  onOpenExam,
  onOpenCertificate,
}) => {
  const stats = calculateOverallProgress(progress);

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-teal-900/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Dashboard Belajar Personal
              </span>
              <span className="text-xs text-slate-400 flex items-center space-x-1">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Streak: {progress.streakDays || 1} Hari</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Halo, {user.name}, {user.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Pantau kesiapan resertifikasi dialisis Anda. Selesaikan seluruh 9 bab modul IPDI 2021, dengarkan narasi audio, dan raih nilai kuis minimal 75% untuk memperoleh sertifikat kompetensi.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-end justify-center shrink-0 bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-center sm:text-right">
            <span className="text-xs text-teal-300 font-semibold uppercase tracking-wider mb-1">
              Kesiapan Resertifikasi
            </span>
            <div className="flex items-baseline space-x-1">
              <span className="text-4xl sm:text-5xl font-black text-white">
                {stats.overallPercentage}
              </span>
              <span className="text-xl font-bold text-teal-400">%</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1">
              {stats.overallPercentage >= 80 ? 'Sangat Siap Ujian' : 'Sedang Berjalan'}
            </span>

            {/* Certificate & Exam Buttons */}
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <button
                onClick={onOpenCertificate}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center space-x-1.5 transition-transform active:scale-95 cursor-pointer"
                title="Cetak dan simpan sertifikat kompetensi mandiri (PDF)"
              >
                <Award className="w-4 h-4" />
                <span>Cetak Sertifikat (PDF)</span>
              </button>
              <button
                onClick={onOpenExam}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Simulasi Try Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
            <span>Progres Kumulatif Modul</span>
            <span>{stats.readCount} dari 9 Bab Dibaca • {stats.quizPassedCount} Kuis Lulus</span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-teal-400 to-cyan-400 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${stats.overallPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Materi Dibaca</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-800">{stats.readCount} / 9</div>
          <span className="text-[11px] text-slate-400">Bab modul selesai ditelaah</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Audio Narasi</span>
            <div className="p-2 bg-teal-50 text-teal-600 rounded-xl">
              <Volume2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-800">{stats.audioCount} / 9</div>
          <span className="text-[11px] text-slate-400">Sesi audio diselesaikan</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Kuis Lulus (≥75%)</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-800">{stats.quizPassedCount} / 9</div>
          <span className="text-[11px] text-emerald-600 font-medium">
            {stats.quizPassedCount >= 7 ? 'Memenuhi syarat' : 'Butuh minimal 7 bab'}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Rata-rata Kuis</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-800">{stats.averageQuizScore}%</div>
          <span className="text-[11px] text-slate-400">Skor rata-rata per bab</span>
        </div>
      </div>

      {/* Dedicated Ready-to-Print Certificate Feature Box */}
      <div className="bg-gradient-to-r from-amber-500/10 via-teal-500/10 to-emerald-500/10 dark:from-amber-950/40 dark:via-teal-950/40 dark:to-emerald-950/40 rounded-3xl p-6 sm:p-7 border-2 border-amber-300 dark:border-amber-700/60 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-teal-700 text-white flex items-center justify-center shrink-0 shadow-lg border-2 border-amber-200">
            <Award className="w-9 h-9" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-serif font-black text-lg sm:text-xl text-slate-900 dark:text-white">
                Sertifikat Kompetensi Siap Cetak (Print & PDF)
              </h3>
              <span className="text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700 px-2 py-0.5 rounded-full font-extrabold uppercase">
                Fitur Aktif
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Diterbitkan secara digital atas nama <strong>{user.name}, {user.title}</strong> ({user.hospital}). Dokumen standar resmi A4 Landscape dengan nomor registrasi unik, segel verifikasi IPDI, dan siap langsung dicetak atau diunduh sebagai file PDF.
            </p>
          </div>
        </div>

        <div className="shrink-0 w-full sm:w-auto">
          <button
            onClick={onOpenCertificate}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-lg flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Unduh PDF Sekarang</span>
          </button>
        </div>
      </div>

      {/* Chapters Checklist Breakdown */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div>
            <h3 className="font-bold text-slate-800 text-base">
              Rincian Progres Per Bab Modul
            </h3>
            <p className="text-xs text-slate-500">Status penyelesaian membaca materi, audio, dan nilai kuis per bab</p>
          </div>
          <button
            onClick={onOpenExam}
            className="text-xs font-bold text-teal-700 hover:text-teal-900 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200 transition-colors"
          >
            Ikuti Try Out Ujian
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {allChapters.map((ch) => {
            const chProg = progress.chapters[ch.id];
            const isRead = !!chProg?.isRead;
            const isAudio = !!chProg?.isAudioFinished;
            const quizScore = chProg?.quizScore ?? null;
            const isPassed = !!chProg?.quizPassed;

            return (
              <div
                key={ch.id}
                onClick={() => onSelectChapter(ch.id)}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 px-3 rounded-2xl transition-colors cursor-pointer"
              >
                <div className="flex items-start space-x-3.5 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                      isPassed && isRead
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {ch.id}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-mono font-bold text-teal-700">
                        {ch.romanNumeral}
                      </span>
                      <h4 className="text-sm font-bold text-slate-800 truncate">{ch.title}</h4>
                    </div>
                    <p className="text-xs text-slate-500 truncate max-w-lg">{ch.subtitle}</p>
                  </div>
                </div>

                {/* Status indicators */}
                <div className="flex items-center space-x-4 shrink-0 self-end sm:self-center">
                  <div className="flex items-center space-x-2 text-xs">
                    {/* Read badge */}
                    <span
                      className={`px-2.5 py-1 rounded-lg font-medium text-[11px] flex items-center space-x-1 ${
                        isRead
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>{isRead ? 'Dibaca' : 'Belum'}</span>
                    </span>

                    {/* Audio badge */}
                    <span
                      className={`px-2.5 py-1 rounded-lg font-medium text-[11px] flex items-center space-x-1 ${
                        isAudio
                          ? 'bg-teal-50 text-teal-700 border border-teal-200'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                      title={isAudio ? 'Audio selesai didengarkan' : 'Audio belum diputar'}
                    >
                      <Volume2 className="w-3 h-3" />
                    </span>

                    {/* Quiz score badge */}
                    <span
                      className={`px-2.5 py-1 rounded-lg font-bold text-[11px] flex items-center space-x-1 ${
                        quizScore !== null
                          ? isPassed
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      <HelpCircle className="w-3 h-3" />
                      <span>{quizScore !== null ? `${quizScore}%` : 'Belum Kuis'}</span>
                    </span>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-400 hover:text-teal-600" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
