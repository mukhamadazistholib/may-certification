export interface SubTopic {
  id: string;
  title: string;
  content: string[];
  keyPoints?: string[];
  clinicalWarning?: string;
}

export interface ClinicalFormula {
  name: string;
  formula: string;
  description: string;
  example: string;
  clinicalTarget: string;
}

export interface KeyTakeaway {
  id: string;
  category: 'Konsep Dasar' | 'Nilai Kritis' | 'Tindakan Keperawatan' | 'Prosedur & Rasional' | 'Safety Alert';
  title: string;
  summary: string;
  badge?: string;
  highlightText?: string;
}

export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  referencePage: string;
}

export interface Chapter {
  id: number;
  romanNumeral: string;
  title: string;
  subtitle: string;
  iconName: string;
  badge: string;
  estimatedMinutes: number;
  pageRange: string;
  overview: string;
  voiceSummary: string; // concise Indonesian script optimized for TTS narration
  keyTakeaways: KeyTakeaway[];
  clinicalFormulas?: ClinicalFormula[];
  subtopics: SubTopic[];
  quizQuestions: QuizQuestion[];
}

export interface UserProfile {
  id: string;
  name: string;
  title: string; // e.g. "S.Kep., Ners" or "A.Md.Kep"
  hospital: string;
  niraOrNik: string; // NIRA IPDI / NIK
  avatarColor: string;
  joinedAt: string;
}

export interface ChapterProgress {
  chapterId: number;
  isRead: boolean;
  isAudioFinished: boolean;
  quizScore: number | null; // 0 - 100
  quizPassed: boolean;
  attempts: number;
  lastStudiedAt: string | null;
  bookmarked: boolean;
}

export interface UserProgressData {
  userId: string;
  chapters: Record<number, ChapterProgress>;
  totalStudyMinutes: number;
  streakDays: number;
  lastActiveDate: string;
  examHistory: {
    date: string;
    score: number;
    totalQuestions: number;
    passed: boolean;
    durationMinutes: number;
  }[];
  personalNotes: Record<number, string>;
}
