import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Timer,
  CheckCircle2,
  XCircle,
  Award,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Layers,
  Loader2,
  Bot
} from 'lucide-react';
import { allQuizQuestions } from '../data/allChapters';
import { QuizQuestion } from '../types/dialysis';
import { recordGrandExamResult } from '../services/storageService';
import { generateSmartClinicalQuestions } from '../data/dynamicScenarioGenerator';

interface GrandExamModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
  onFinished?: () => void;
  onOpenCertificate?: () => void;
}

export const GrandExamModal: React.FC<GrandExamModalProps> = ({
  userId,
  isOpen,
  onClose,
  onFinished,
  onOpenCertificate,
}) => {
  const [examType, setExamType] = useState<'standard' | 'ai'>('standard');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60); // 25 minutes
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

  const initStandardExam = () => {
    const shuffled = [...allQuizQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(25, shuffled.length));
    setQuestions(selected);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setTimeLeft(25 * 60);
    setIsFinished(false);
    setScore(0);
    setExamType('standard');
  };

  const initAiDynamicExam = async () => {
    setIsLoadingAi(true);
    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          count: 10,
          difficulty: 'kasus_klinis',
        }),
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.questions) && data.questions.length > 0) {
        setQuestions(data.questions);
        setCurrentIdx(0);
        setSelectedAnswers({});
        setTimeLeft(15 * 60); // 15 mins for 10 case questions
        setIsFinished(false);
        setScore(0);
        setExamType('ai');
      } else {
        throw new Error('Fallback required');
      }
    } catch (e) {
      console.warn('AI exam generation failed or was unavailable, activating smart clinical case engine:', e);
      const fallback = generateSmartClinicalQuestions(undefined, 10);
      setQuestions(fallback);
      setCurrentIdx(0);
      setSelectedAnswers({});
      setTimeLeft(15 * 60);
      setIsFinished(false);
      setScore(0);
      setExamType('ai');
    } finally {
      setIsLoadingAi(false);
    }
  };

  // Initialize random exam questions when opened
  useEffect(() => {
    if (isOpen) {
      initStandardExam();
    }
  }, [isOpen]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || isFinished || timeLeft <= 0 || isLoadingAi) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isFinished, timeLeft, isLoadingAi]);

  if (!isOpen) return null;

  const handleSelect = (optionIdx: number) => {
    if (isFinished) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIdx]: optionIdx,
    }));
  };

  const handleFinishExam = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });

    const calculatedScore = Math.round((correct / questions.length) * 100);
    setScore(calculatedScore);
    setIsFinished(true);

    const totalAllocated = examType === 'ai' ? 15 * 60 : 25 * 60;
    const durationTakenMinutes = Math.max(1, Math.round((totalAllocated - timeLeft) / 60));
    recordGrandExamResult(userId, calculatedScore, questions.length, durationTakenMinutes);

    if (calculatedScore >= 75) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
        });
      } catch (e) {}
    }

    if (onFinished) onFinished();
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIdx];
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-teal-500/20 text-teal-400 rounded-xl">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-base text-white">
                  Simulasi Ujian Resertifikasi Perawat Dialisis IPDI
                </h3>
                {examType === 'ai' && (
                  <span className="text-[10px] bg-teal-500 text-slate-950 px-2 py-0.5 rounded font-black uppercase tracking-wider">
                    AI Case Mode
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                {examType === 'standard'
                  ? `25 Soal Acak dari Bank 69 Soal Modul IPDI (Passing Grade 75%)`
                  : `10 Soal Kasus Klinis Baru Di-generate Gemini 3.8 Flash`}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {!isFinished && !isLoadingAi && (
              <div
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold ${
                  timeLeft < 300 ? 'bg-red-500/20 text-red-300 animate-pulse' : 'bg-slate-800 text-teal-300'
                }`}
              >
                <Timer className="w-4 h-4" />
                <span>{formatTimer(timeLeft)}</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mode Switcher toolbar if not finished */}
        {!isFinished && !isLoadingAi && (
          <div className="bg-slate-50 px-6 py-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-500 font-medium">Pilihan Mode Ujian:</span>
            <div className="flex space-x-2">
              <button
                onClick={initStandardExam}
                className={`px-3 py-1 rounded-lg font-bold flex items-center space-x-1.5 cursor-pointer ${
                  examType === 'standard'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>Bank Soal Modul (25 Soal)</span>
              </button>

              <button
                onClick={initAiDynamicExam}
                className={`px-3 py-1 rounded-lg font-bold flex items-center space-x-1.5 cursor-pointer ${
                  examType === 'ai'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Sparkles className="w-3 h-3 text-teal-600" />
                <span>Generate Ujian Kasus AI Baru</span>
              </button>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1">
          {isLoadingAi ? (
            <div className="py-16 text-center space-y-4">
              <Loader2 className="w-12 h-12 text-teal-600 animate-spin mx-auto" />
              <div>
                <h4 className="font-bold text-slate-800 text-base">
                  Menyusun Soal Ujian Kasus Klinis dengan Gemini AI...
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Menelaah kompetensi 9 bab modul IPDI 2021 dan membuat skenario kasus perawatan pasien terkini.
                </p>
              </div>
            </div>
          ) : isFinished ? (
            /* Result Screen */
            <div className="space-y-6">
              <div
                className={`p-6 rounded-2xl border text-center ${
                  score >= 75
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
              >
                <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-3 bg-white shadow-md">
                  {score >= 75 ? (
                    <Award className="w-8 h-8 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="w-8 h-8 text-amber-600" />
                  )}
                </div>
                <h4 className="text-2xl font-black mb-1">
                  {score >= 75 ? 'LULUS SIMULASI KOMPETENSI!' : 'BELUM MEMENUHI STANDAR'}
                </h4>
                <p className="text-sm opacity-90 max-w-md mx-auto">
                  {score >= 75
                    ? 'Selamat! Pemahaman materi modul Anda memenuhi standar kompetensi perawat dialisis IPDI.'
                    : 'Nilai Anda belum mencapai passing grade 75%. Pelajari kembali rangkuman dan poin kritis di modul.'}
                </p>
                <div className="mt-4 inline-block bg-white px-6 py-2 rounded-2xl shadow-xs border border-slate-200">
                  <span className="text-xs uppercase tracking-wider text-slate-500 block font-semibold">
                    Nilai Akhir
                  </span>
                  <span className="text-4xl font-black text-slate-800">{score}%</span>
                </div>
              </div>

              {/* Review answers */}
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-3">Tinjauan Jawaban & Pembahasan:</h4>
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                  {questions.map((q, idx) => {
                    const ans = selectedAnswers[idx];
                    const isRight = ans === q.correctIndex;
                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border text-xs leading-relaxed ${
                          isRight ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2 font-semibold">
                          <span>
                            {idx + 1}. {q.question}
                          </span>
                          <span
                            className={`shrink-0 font-bold px-2 py-0.5 rounded text-[10px] ${
                              isRight ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                            }`}
                          >
                            {isRight ? 'Benar' : 'Salah'}
                          </span>
                        </div>
                        <p className="text-slate-600">
                          <strong>Kunci Jawaban:</strong> {q.options[q.correctIndex]}
                        </p>
                        <p className="text-slate-500 mt-1 italic">{q.explanation}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : currentQ ? (
            /* Question Active Screen */
            <div>
              {/* Question Number Pills */}
              <div className="flex flex-wrap gap-1.5 mb-6 pb-4 border-b border-slate-100">
                {questions.map((_, idx) => {
                  const isAnswered = selectedAnswers[idx] !== undefined;
                  const isCurrent = idx === currentIdx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentIdx(idx)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-teal-600 text-white ring-2 ring-teal-400 ring-offset-1'
                          : isAnswered
                          ? 'bg-teal-100 text-teal-900 font-semibold'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Current Question */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 text-xs font-bold text-teal-700 uppercase tracking-wider mb-2">
                  <span>Soal {currentIdx + 1} dari {questions.length}</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
                  {currentQ.question}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentIdx] === optIdx;
                  const letter = String.fromCharCode(65 + optIdx);
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(optIdx)}
                      className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm flex items-start space-x-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-teal-50 border-teal-600 text-teal-950 font-semibold shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                          isSelected ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="flex-1 leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {isFinished ? (
            <div className="w-full flex flex-wrap justify-between items-center gap-2">
              <button
                onClick={initStandardExam}
                className="px-4 py-2 border border-slate-200 bg-white rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center space-x-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi Simulasi</span>
              </button>

              <div className="flex items-center space-x-2">
                {onOpenCertificate && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenCertificate();
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-bold shadow-md flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5 text-slate-950" />
                    <span>Cetak Sertifikat (PDF)</span>
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Tutup Review
                </button>
              </div>
            </div>
          ) : !isLoadingAi ? (
            <>
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 border border-slate-200 bg-white rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </button>

              <div className="text-xs text-slate-500">
                Terisi: <strong className="text-teal-700">{answeredCount}</strong> / {questions.length}
              </div>

              {currentIdx < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))}
                  className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold flex items-center space-x-1 cursor-pointer"
                >
                  <span>Selanjutnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleFinishExam}
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  Selesai & Kumpulkan Ujian
                </button>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
