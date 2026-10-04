import { Chapter, QuizQuestion } from '../types/dialysis';
import { chapters1to3 } from './chapters1to3';
import { chapters4to6 } from './chapters4to6';
import { chapters7to9 } from './chapters7to9';

export const allChapters: Chapter[] = [
  ...chapters1to3,
  ...chapters4to6,
  ...chapters7to9
];

export const allQuizQuestions: QuizQuestion[] = allChapters.flatMap(c => c.quizQuestions);

export const getChapterById = (id: number): Chapter | undefined => {
  return allChapters.find(c => c.id === id);
};
