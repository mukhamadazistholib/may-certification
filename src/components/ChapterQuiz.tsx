import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, BookOpen, HelpCircle } from 'lucide-react';
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
  questions,
  onQuizCompleted,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const handleSelectOption = (questionIdx: number, optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIdx]: optionIdx,
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / questions.length) * 100);
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
      } catch (e) {
        // ignore
      }
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

  const answeredCount = Object.keys(selectedAnswers).length;
  const isAllAnswered = answeredCount === questions.length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-3 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-800">
              Evaluasi Pemahaman
            </span>
            <span className="text-xs text-slate-500">Standar Kompetensi IPDI</span>
          </div>
          <h3 className="text-lg font-bold text-slate-800 mt-1">
            Kuis Otomatis: {chapterTitle}
          </h3>
        </div>

        {!isSubmitted && (
          <div className="text-xs font-medium text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            Terjawab: <span className="font-bold text-teal-700">{answeredCount}</span> dari{' '}
            <span className="font-bold">{questions.length}</span> soal
          </div>
        )}
      </div>

      {/* Result Banner if submitted */}
      {isSubmitted && (
        <div
          className={`p-6 rounded-2xl mb-8 border transition-all ${
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
                    : 'Passing grade adalah 75%. Pelajari kembali rangkuman dan dengarkan audio lalu coba lagi.'}
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
                className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl font-semibold text-xs text-slate-800 flex items-center space-x-1.5 shadow-xs transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Kuis</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Question List */}
      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const userChoice = selectedAnswers[qIdx];
          const isCorrect = userChoice === q.correctIndex;

          return (
            <div
              key={q.id}
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
                    <span>Rasional & Pembahasan ({q.referencePage}):</span>
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
        <div className="mt-8 flex justify-end">
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
