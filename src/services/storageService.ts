import { UserProfile, UserProgressData, ChapterProgress } from '../types/dialysis';

const PROFILES_STORAGE_KEY = 'dialisi_profiles_v1';
const ACTIVE_PROFILE_KEY = 'dialisi_active_profile_v1';
const PROGRESS_PREFIX = 'dialisi_progress_';

const DEFAULT_PROFILE: UserProfile = {
  id: 'default-nurse-1',
  name: 'Perawat Dialisis',
  title: 'S.Kep., Ners',
  hospital: 'Unit Hemodialisis RSUD',
  niraOrNik: 'IPDI-2021-089',
  avatarColor: '#0d9488', // teal-600
  joinedAt: new Date().toISOString(),
};

export const getProfiles = (): UserProfile[] => {
  try {
    const raw = localStorage.getItem(PROFILES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify([DEFAULT_PROFILE]));
      return [DEFAULT_PROFILE];
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load profiles:', e);
    return [DEFAULT_PROFILE];
  }
};

export const saveProfiles = (profiles: UserProfile[]) => {
  localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));
};

export const getActiveProfileId = (): string => {
  const stored = localStorage.getItem(ACTIVE_PROFILE_KEY);
  if (stored) return stored;
  return DEFAULT_PROFILE.id;
};

export const setActiveProfileId = (id: string) => {
  localStorage.setItem(ACTIVE_PROFILE_KEY, id);
};

export const getActiveProfile = (): UserProfile => {
  const profiles = getProfiles();
  const activeId = getActiveProfileId();
  return profiles.find((p) => p.id === activeId) || profiles[0] || DEFAULT_PROFILE;
};

export const getInitialChapterProgress = (chapterId: number): ChapterProgress => ({
  chapterId,
  isRead: false,
  isAudioFinished: false,
  quizScore: null,
  quizPassed: false,
  attempts: 0,
  lastStudiedAt: null,
  bookmarked: false,
});

export const getInitialProgressData = (userId: string): UserProgressData => {
  const chapters: Record<number, ChapterProgress> = {};
  for (let i = 1; i <= 9; i++) {
    chapters[i] = getInitialChapterProgress(i);
  }
  return {
    userId,
    chapters,
    totalStudyMinutes: 0,
    streakDays: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    examHistory: [],
    personalNotes: {},
  };
};

export const getUserProgress = (userId: string): UserProgressData => {
  try {
    const raw = localStorage.getItem(`${PROGRESS_PREFIX}${userId}`);
    if (!raw) {
      const init = getInitialProgressData(userId);
      saveUserProgress(init);
      return init;
    }
    const data: UserProgressData = JSON.parse(raw);
    // ensure all 9 chapters exist
    for (let i = 1; i <= 9; i++) {
      if (!data.chapters[i]) {
        data.chapters[i] = getInitialChapterProgress(i);
      }
    }
    return data;
  } catch (e) {
    console.error('Failed to load progress:', e);
    return getInitialProgressData(userId);
  }
};

export const saveUserProgress = (progress: UserProgressData) => {
  try {
    localStorage.setItem(`${PROGRESS_PREFIX}${progress.userId}`, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
};

export const updateChapterReadStatus = (userId: string, chapterId: number, isRead: boolean) => {
  const progress = getUserProgress(userId);
  if (!progress.chapters[chapterId]) {
    progress.chapters[chapterId] = getInitialChapterProgress(chapterId);
  }
  progress.chapters[chapterId].isRead = isRead;
  progress.chapters[chapterId].lastStudiedAt = new Date().toISOString();
  saveUserProgress(progress);
};

export const updateAudioFinishedStatus = (userId: string, chapterId: number) => {
  const progress = getUserProgress(userId);
  if (!progress.chapters[chapterId]) {
    progress.chapters[chapterId] = getInitialChapterProgress(chapterId);
  }
  progress.chapters[chapterId].isAudioFinished = true;
  progress.chapters[chapterId].lastStudiedAt = new Date().toISOString();
  saveUserProgress(progress);
};

export const toggleBookmark = (userId: string, chapterId: number): boolean => {
  const progress = getUserProgress(userId);
  if (!progress.chapters[chapterId]) {
    progress.chapters[chapterId] = getInitialChapterProgress(chapterId);
  }
  const current = !!progress.chapters[chapterId].bookmarked;
  progress.chapters[chapterId].bookmarked = !current;
  saveUserProgress(progress);
  return !current;
};

export const recordQuizResult = (
  userId: string,
  chapterId: number,
  score: number,
  passingScore = 75
) => {
  const progress = getUserProgress(userId);
  if (!progress.chapters[chapterId]) {
    progress.chapters[chapterId] = getInitialChapterProgress(chapterId);
  }
  const ch = progress.chapters[chapterId];
  ch.attempts = (ch.attempts || 0) + 1;
  ch.quizScore = Math.max(ch.quizScore || 0, score);
  if (score >= passingScore) {
    ch.quizPassed = true;
  }
  ch.lastStudiedAt = new Date().toISOString();
  saveUserProgress(progress);
};

export const savePersonalNote = (userId: string, chapterId: number, note: string) => {
  const progress = getUserProgress(userId);
  progress.personalNotes[chapterId] = note;
  saveUserProgress(progress);
};

export const recordGrandExamResult = (
  userId: string,
  score: number,
  totalQuestions: number,
  durationMinutes: number
) => {
  const progress = getUserProgress(userId);
  const passed = score >= 75;
  progress.examHistory.push({
    date: new Date().toISOString(),
    score,
    totalQuestions,
    passed,
    durationMinutes,
  });
  saveUserProgress(progress);
};

export const addStudyTime = (userId: string, minutes: number) => {
  const progress = getUserProgress(userId);
  progress.totalStudyMinutes = (progress.totalStudyMinutes || 0) + minutes;
  
  // check streak
  const today = new Date().toISOString().split('T')[0];
  if (progress.lastActiveDate !== today) {
    const lastDate = new Date(progress.lastActiveDate);
    const currDate = new Date(today);
    const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
    if (diffDays === 1) {
      progress.streakDays = (progress.streakDays || 0) + 1;
    } else if (diffDays > 1) {
      progress.streakDays = 1;
    }
    progress.lastActiveDate = today;
  }
  saveUserProgress(progress);
};

export const calculateOverallProgress = (progress: UserProgressData) => {
  const totalChapters = 9;
  let readCount = 0;
  let audioCount = 0;
  let quizPassedCount = 0;
  let totalQuizScoreSum = 0;
  let quizTakenCount = 0;

  for (let i = 1; i <= totalChapters; i++) {
    const ch = progress.chapters[i];
    if (ch) {
      if (ch.isRead) readCount++;
      if (ch.isAudioFinished) audioCount++;
      if (ch.quizPassed) quizPassedCount++;
      if (ch.quizScore !== null) {
        totalQuizScoreSum += ch.quizScore;
        quizTakenCount++;
      }
    }
  }

  // Weight: 35% reading, 25% audio, 40% quiz
  const readPct = (readCount / totalChapters) * 100;
  const audioPct = (audioCount / totalChapters) * 100;
  const quizPct = (quizPassedCount / totalChapters) * 100;
  const overallPercentage = Math.round(readPct * 0.35 + audioPct * 0.25 + quizPct * 0.4);
  const averageQuizScore = quizTakenCount > 0 ? Math.round(totalQuizScoreSum / quizTakenCount) : 0;

  return {
    readCount,
    audioCount,
    quizPassedCount,
    totalChapters,
    overallPercentage,
    averageQuizScore,
    isEligibleForCertificate: quizPassedCount >= 7 && overallPercentage >= 75,
  };
};
