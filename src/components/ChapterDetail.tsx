import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  BookOpen,
  CheckCircle,
  Bookmark,
  Share2,
  FileText,
  AlertCircle,
  HelpCircle,
  Calculator,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Save
} from 'lucide-react';
import { Chapter } from '../types/dialysis';
import { voiceService } from '../services/voiceService';
import {
  getUserProgress,
  updateChapterReadStatus,
  updateAudioFinishedStatus,
  toggleBookmark,
  savePersonalNote
} from '../services/storageService';
import { ChapterQuiz } from './ChapterQuiz';

interface ChapterDetailProps {
  chapter: Chapter;
  userId: string;
  onNavigateChapter: (chapterId: number) => void;
  onBackToList: () => void;
}

export const ChapterDetail: React.FC<ChapterDetailProps> = ({
  chapter,
  userId,
  onNavigateChapter,
  onBackToList,
}) => {
  const [activeTab, setActiveTab] = useState<'materi' | 'summary' | 'kuis' | 'catatan'>('materi');
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState(getUserProgress(userId));
  const [noteText, setNoteText] = useState<string>(progress.personalNotes[chapter.id] || '');
  const [isSavedNote, setIsSavedNote] = useState<boolean>(false);

  useEffect(() => {
    const unsub = voiceService.subscribe((state) => {
      setIsAudioPlaying(state.isPlaying && state.currentChapterId === chapter.id);
    });
    return unsub;
  }, [chapter.id]);

  useEffect(() => {
    // refresh progress & note when chapter changes
    const curProgress = getUserProgress(userId);
    setProgress(curProgress);
    setNoteText(curProgress.personalNotes[chapter.id] || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [chapter.id, userId]);

  const chProgress = progress.chapters[chapter.id];

  const handlePlayVoice = () => {
    if (isAudioPlaying) {
      voiceService.stop();
    } else {
      voiceService.play(chapter.voiceSummary, chapter.id, () => {
        updateAudioFinishedStatus(userId, chapter.id);
        setProgress(getUserProgress(userId));
      });
    }
  };

  const handleToggleRead = () => {
    const newStatus = !chProgress?.isRead;
    updateChapterReadStatus(userId, chapter.id, newStatus);
    setProgress(getUserProgress(userId));
  };

  const handleToggleBookmark = () => {
    toggleBookmark(userId, chapter.id);
    setProgress(getUserProgress(userId));
  };

  const handleSaveNote = () => {
    savePersonalNote(userId, chapter.id, noteText);
    setIsSavedNote(true);
    setTimeout(() => setIsSavedNote(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto pb-24">
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBackToList}
          className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-teal-700 bg-white px-3 py-2 rounded-xl border border-slate-200 transition-colors shadow-xs cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Bab</span>
        </button>

        <div className="flex items-center space-x-2">
          {chapter.id > 1 && (
            <button
              onClick={() => onNavigateChapter(chapter.id - 1)}
              className="p-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors"
              title="Bab Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          <span className="text-xs font-bold text-slate-500 font-mono">
            Bab {chapter.id} / 9
          </span>
          {chapter.id < 9 && (
            <button
              onClick={() => onNavigateChapter(chapter.id + 1)}
              className="p-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors"
              title="Bab Selanjutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Chapter Hero Header Card */}
      <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden mb-6">
        {/* Decorative circle accents */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-teal-400/20 text-teal-300 font-mono text-xs font-bold px-3 py-1 rounded-full border border-teal-400/30">
              {chapter.romanNumeral}
            </span>
            <span className="bg-white/10 text-slate-200 text-xs font-medium px-3 py-1 rounded-full">
              {chapter.badge}
            </span>
            <span className="text-xs text-teal-200/80">
              Referensi: {chapter.pageRange}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            {chapter.title}
          </h1>
          <p className="text-sm sm:text-base text-teal-100/90 max-w-3xl leading-relaxed mb-6">
            {chapter.subtitle}
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-teal-700/50">
            {/* Play Voice Narration Button */}
            <button
              onClick={handlePlayVoice}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer ${
                isAudioPlaying
                  ? 'bg-rose-500 hover:bg-rose-600 text-white ring-4 ring-rose-400/30'
                  : 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 ring-4 ring-emerald-400/20'
              }`}
            >
              {isAudioPlaying ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>Hentikan Suara</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 animate-bounce" />
                  <span>Putar Materi Inti Wajib Diingat (Voice)</span>
                </>
              )}
            </button>

            {/* Read status toggle */}
            <button
              onClick={handleToggleRead}
              className={`flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                chProgress?.isRead
                  ? 'bg-teal-500/20 text-teal-200 border-teal-400/40'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
            >
              <CheckCircle className={`w-4 h-4 ${chProgress?.isRead ? 'text-teal-300' : 'text-slate-400'}`} />
              <span>{chProgress?.isRead ? 'Selesai Dipelajari' : 'Tandai Selesai'}</span>
            </button>

            {/* Bookmark */}
            <button
              onClick={handleToggleBookmark}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                chProgress?.bookmarked
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                  : 'bg-white/10 hover:bg-white/20 text-slate-300 border-white/20'
              }`}
              title={chProgress?.bookmarked ? 'Hapus Bookmark' : 'Simpan Bookmark'}
            >
              <Bookmark className={`w-4 h-4 ${chProgress?.bookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Quiz badge if passed */}
            {chProgress?.quizPassed && (
              <span className="ml-auto text-xs bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-bold px-3 py-1.5 rounded-xl flex items-center space-x-1">
                <span>Nilai Kuis: {chProgress.quizScore}%</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-slate-200 mb-6 bg-white rounded-2xl p-1.5 shadow-xs">
        <button
          onClick={() => setActiveTab('materi')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'materi'
              ? 'bg-teal-50 text-teal-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Materi Lengkap</span>
        </button>

        <button
          onClick={() => setActiveTab('summary')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'summary'
              ? 'bg-teal-50 text-teal-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-teal-600" />
          <span>Poin Penting & Rumus</span>
          <span className="bg-teal-200 text-teal-900 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
            {chapter.keyTakeaways.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('kuis')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'kuis'
              ? 'bg-teal-50 text-teal-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Kuis Bab ({chapter.quizQuestions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('catatan')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'catatan'
              ? 'bg-teal-50 text-teal-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Catatan Saya</span>
        </button>
      </div>

      {/* Tab 1: Materi Lengkap */}
      {activeTab === 'materi' && (
        <div className="space-y-6">
          {/* Audio overview banner */}
          <div className="bg-teal-50/80 border border-teal-200 rounded-2xl p-5 flex items-start space-x-3.5">
            <div className="p-2.5 bg-teal-600 text-white rounded-xl shrink-0 mt-0.5">
              <Volume2 className="w-5 h-5" />
            </div>
            <div className="flex-1 text-xs sm:text-sm text-teal-950 leading-relaxed">
              <h4 className="font-bold text-teal-900 mb-1">Materi Wajib Diingat (Audio Voice Narasi):</h4>
              <p className="text-teal-900 font-medium leading-relaxed">{chapter.voiceSummary}</p>
            </div>
          </div>

          {/* Subtopics */}
          {chapter.subtopics.map((sub, sIdx) => (
            <div key={sub.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-800">
                  {sub.title}
                </h3>
                <button
                  onClick={() => voiceService.play(sub.content.join(' '), chapter.id)}
                  className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center space-x-1 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  title="Dengarkan sub-bab ini saja"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Dengarkan Sub-Bab</span>
                </button>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {sub.content.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {/* Key points box if available */}
              {sub.keyPoints && sub.keyPoints.length > 0 && (
                <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                    Fokus Klinis Penting:
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
                    {sub.keyPoints.map((kp, kIdx) => (
                      <li key={kIdx}>{kp}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Clinical Warning if available */}
              {sub.clinicalWarning && (
                <div className="mt-4 bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start space-x-3 text-xs text-rose-900">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">Peringatan Keselamatan:</span>
                    <span>{sub.clinicalWarning}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Poin Penting & Rumus */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          {/* Key Takeaways */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
              Rangkuman Poin Kunci Penting untuk Diingat (High-Yield Takeaways)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chapter.keyTakeaways.map((item) => {
                let badgeColor = 'bg-teal-100 text-teal-800';
                if (item.category === 'Safety Alert') badgeColor = 'bg-rose-100 text-rose-800 font-black';
                else if (item.category === 'Nilai Kritis') badgeColor = 'bg-amber-100 text-amber-900 font-bold';

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:border-teal-400 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className={`text-[11px] px-2.5 py-0.5 rounded-full ${badgeColor}`}>
                          {item.category}
                        </span>
                        {item.badge && (
                          <span className="text-[11px] font-mono text-slate-400 font-medium">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm mb-2">{item.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.summary}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <button
                        onClick={() => voiceService.play(`${item.title}. ${item.summary}`, chapter.id)}
                        className="text-teal-600 hover:text-teal-800 font-semibold flex items-center space-x-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Baca dengan Suara</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Clinical Formulas if available */}
          {chapter.clinicalFormulas && chapter.clinicalFormulas.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
                Rumus & Nilai Standar Klinis
              </h3>
              <div className="space-y-4">
                {chapter.clinicalFormulas.map((f, fIdx) => (
                  <div
                    key={fIdx}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Calculator className="w-4 h-4 text-teal-600" />
                      <h4 className="font-bold text-slate-800 text-sm">{f.name}</h4>
                    </div>

                    <div className="p-3 bg-slate-900 text-teal-300 font-mono text-xs rounded-xl overflow-x-auto my-2">
                      {f.formula}
                    </div>

                    <p className="text-xs text-slate-600 mb-2">{f.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div>
                        <span className="font-semibold text-slate-500 block">Contoh Aplikasi:</span>
                        <span className="text-slate-800 font-mono text-[11px]">{f.example}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-500 block">Target Standar:</span>
                        <span className="text-teal-700 font-bold">{f.clinicalTarget}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Kuis Bab */}
      {activeTab === 'kuis' && (
        <ChapterQuiz
          userId={userId}
          chapterId={chapter.id}
          chapterTitle={chapter.title}
          questions={chapter.quizQuestions}
          onQuizCompleted={() => setProgress(getUserProgress(userId))}
        />
      )}

      {/* Tab 4: Catatan Pribadi */}
      {activeTab === 'catatan' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 className="font-bold text-slate-800 text-base">Catatan Belajar Personal</h3>
              <p className="text-xs text-slate-500">Tulis ringkasan, poin hafalan, atau pertanyaan untuk didiskusikan</p>
            </div>
            <button
              onClick={handleSaveNote}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSavedNote ? 'Tersimpan!' : 'Simpan Catatan'}</span>
            </button>
          </div>

          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Tulis catatan belajar Anda di sini... (otomatis tersimpan untuk profil Anda)"
            rows={8}
            className="w-full p-4 border border-slate-200 rounded-xl text-sm focus:outline-teal-500 font-sans leading-relaxed text-slate-800"
          />

          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span>Tersimpan di perangkat lokal untuk profil aktif Anda.</span>
            <span>{noteText.length} karakter</span>
          </div>
        </div>
      )}
    </div>
  );
};
