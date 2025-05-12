export type Question = {
  id: number;
  question: string;
  code: string;
  answers: string[];
  correctAnswer: number;
  userSelectedAnswer?: number | null;
  isCorrectuserANswer?: boolean;
};