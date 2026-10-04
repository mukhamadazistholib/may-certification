import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  ArrowRight,
  BookOpen,
  Sparkles,
  Loader2,
  Layers,
  Bot
} from 'lucide-react';
import { QuizQuestion } from '../types/dialysis';
import { recordQuizResult } from '../services/storageService';

interface ChapterQuizProps {
  userId: string;
  chapterId: number;
  chapterTitle: string;
  questions: QuizQuestion[];
  onQuizCompleted?: (score: number) => void;
}

export const ChapterQuiz: React.FC<ChapterQuizProps> = ({
  userId,
  chapterId,
  chapterTitle,
  questions: staticQuestions,
  onQuizCompleted,
}) => {
  const [activeMode, setActiveMode] = useState<'static' | 'ai'>('static');
  const [aiQuestions, setAiQuestions] = useState<QuizQuestion[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generateError, setGenerateError] = useState<string | null>(null);

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const currentQuestions = activeMode === 'ai' && aiQuestions.length > 0 ? aiQuestions : staticQuestions;

  const handleSelectOption = (questionIdx: number, optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIdx]: optionIdx,
    }));
  };

  const handleGenerateAiQuiz = async () => {
    setIsGenerating(true);
    setGenerateError(null);
    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapterId,
          count: 5,
          difficulty: 'kasus_klinis',
        }),
      });

      const data = await res.json();
      if (data.success && Array.isArray(data.questions) && data.questions.length > 0) {
        setAiQuestions(data.questions);
        setActiveMode('ai');
        setSelectedAnswers({});
        setIsSubmitted(false);
        setScore(0);
      } else {
        throw new Error(data.message || 'Gagal memuat soal AI');
      }
    } catch (err: any) {
      console.error('Failed to generate AI quiz:', err);
      setGenerateError('Tidak dapat menghasilkan soal AI saat ini. Silakan coba kembali.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    currentQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / currentQuestions.length) * 100);
    setScore(calculatedScore);
    setIsSubmitted(true);

    // Save to user personal progress
    recordQuizResult(userId, chapterId, calculatedScore, 75);

    if (calculatedScore >= 75) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    }

    if (onQuizCompleted) {
      onQuizCompleted(calculatedScore);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(0);
  };

  const handleSwitchMode = (mode: 'static' | 'ai') => {
    setActiveMode(mode);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(0);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const isAllAnswered = answeredCount === currentQuestions.length;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Top AI Generator Bar */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 rounded-2xl p-4 sm:p-5 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-400 text-teal-950">
              AI Dynamic Quiz Generator
            </span>
            <span className="text-xs text-teal-300 font-medium">Model: Gemini 3.8 Flash</span>
          </div>
          <h4 className="text-base font-bold text-white flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-teal-300" />
            <span>Kuis Dinamis Tak Terbatas (Konteks Modul IPDI)</span>
          </h4>
          <p className="text-xs text-slate-300">
            Hasilkan variasi soal kasus klinis baru tanpa batas yang 100% selaras dengan bab ini.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={handleGenerateAiQuiz}
            disabled={isGenerating}
            className="px-4 py-2.5 bg-gradient-to-r from-teal-400 to-cyan-300 hover:from-teal-300 hover:to-cyan-200 text-slate-950 font-extrabold text-xs rounded-xl shadow-md flex items-center space-x-2 transition-transform active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Menyusun Soal Klinis AI...</span>
              </>
            ) : (
              <>
                <Bot className="w-4 h-4" />
                <span>Generate 5 Soal AI Baru</span>
              </>
            )}
          </button>
        </div>
      </div>

      {generateError && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs">
          {generateError}
        </div>
      )}

      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => handleSwitchMode('static')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center space-x-1.5 ${
              activeMode === 'static'
                ? 'bg-white text-teal-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Bank Soal Modul ({staticQuestions.length} Soal)</span>
          </button>

          {aiQuestions.length > 0 && (
            <button
              onClick={() => handleSwitchMode('ai')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center space-x-1.5 ${
                activeMode === 'ai'
                  ? 'bg-white text-teal-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Soal AI Ter-generate ({aiQuestions.length} Soal)</span>
            </button>
          )}
        </div>

        {!isSubmitted && (
          <div className="text-xs text-slate-500 font-medium">
            Terjawab: <strong className="text-teal-700">{answeredCount}</strong> / {currentQuestions.length}
          </div>
        )}
      </div>

      {/* Result Screen if submitted */}
      {isSubmitted && (
        <div
          className={`p-6 rounded-2xl border transition-all ${
            score >= 75
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-amber-50 border-amber-200 text-amber-950'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div
                className={`p-3.5 rounded-2xl ${
                  score >= 75 ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                }`}
              >
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-extrabold">
                  {score >= 75 ? 'Selamat! Anda Kompeten' : 'Perlu Pendalaman Materi'}
                </h4>
                <p className="text-sm mt-0.5 opacity-90">
                  {score >= 75
                    ? 'Skor Anda telah memenuhi passing grade resertifikasi IPDI (≥ 75%).'
                    : 'Passing grade adalah 75%. Pelajari kembali rangkuman poin penting lalu ulangi kuis.'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <span className="text-xs uppercase tracking-wider block font-semibold">Skor Akhir</span>
                <span className="text-3xl font-black">{score}%</span>
              </div>
              <button
                onClick={handleRetry}
                className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl font-semibold text-xs text-slate-800 flex items-center space-x-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Kuis</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {currentQuestions.map((q, qIdx) => {
          const userChoice = selectedAnswers[qIdx];
          const isCorrect = userChoice === q.correctIndex;

          return (
            <div
              key={q.id || qIdx}
              className={`p-5 rounded-2xl border transition-all ${
                isSubmitted
                  ? isCorrect
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : 'bg-rose-50/40 border-rose-200'
                  : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h4 className="font-bold text-slate-800 text-sm leading-relaxed flex items-start space-x-2">
                  <span className="bg-slate-200 text-slate-700 w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 font-mono">
                    {qIdx + 1}
                  </span>
                  <span>{q.question}</span>
                </h4>

                {isSubmitted && (
                  <div className="shrink-0">
                    {isCorrect ? (
                      <span className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Benar
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-lg">
                        <XCircle className="w-3.5 h-3.5 mr-1" /> Salah
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2.5 mt-3">
                {q.options.map((option, optIdx) => {
                  const isThisSelected = userChoice === optIdx;
                  let optionClass = 'bg-white border-slate-200 text-slate-700 hover:border-teal-400';

                  if (isSubmitted) {
                    if (optIdx === q.correctIndex) {
                      optionClass = 'bg-emerald-100/80 border-emerald-500 text-emerald-950 font-semibold';
                    } else if (isThisSelected && !isCorrect) {
                      optionClass = 'bg-rose-100/80 border-rose-400 text-rose-950';
                    } else {
                      optionClass = 'bg-white/60 border-slate-200 text-slate-400';
                    }
                  } else if (isThisSelected) {
                    optionClass = 'bg-teal-50 border-teal-600 text-teal-950 font-semibold shadow-xs';
                  }

                  const letter = String.fromCharCode(65 + optIdx);

                  return (
                    <button
                      key={optIdx}
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(qIdx, optIdx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm flex items-start space-x-3 transition-all cursor-pointer disabled:cursor-default ${optionClass}`}
                    >
                      <span
                        className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${
                          isThisSelected
                            ? isSubmitted
                              ? isCorrect
                                ? 'bg-emerald-600 text-white'
                                : 'bg-rose-600 text-white'
                              : 'bg-teal-600 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="flex-1 leading-snug">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation upon submission */}
              {isSubmitted && (
                <div className="mt-4 p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700">
                  <div className="flex items-center space-x-1.5 font-bold text-teal-800 mb-1">
                    <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                    <span>Rasional & Pembahasan ({q.referencePage || 'Modul IPDI 2021'}):</span>
                  </div>
                  <p className="leading-relaxed text-slate-600">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!isSubmitted && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!isAllAnswered}
            className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center space-x-2 transition-all ${
              isAllAnswered
                ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-md active:scale-95 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>Kirim Jawaban & Lihat Nilai</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
