import { create } from "zustand";
import type { Question } from "../types";
import confetti from "canvas-confetti";
import { createJSONStorage, persist } from "zustand/middleware";
// import { devtools } from "zustand/middleware"; // Devtools can be used with redux devtools chrome extension
import { getQuestions } from "../services/questions";

type State = {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (_limit: number) => Promise<void>;
  selectAnswer: (_questionId: Question["id"], _answerIndex: number) => void,
  goNextQuestion: () => void,
  goPreviousQuestion: () => void,
  resetGame: () => void
};

// const logger = (config: any) => (set: any, get: any, api: any) => {
//   return config((...args) => {
//     console.log("applying", args);
//     set(...args);
//     console.log("new state", get());
//   }, get, api);
// };

export const useQuestionsStore = create<State>()(persist((set, get) => {
  return {
    questions:       [],
    currentQuestion: 0,
    fetchQuestions:  async (limit: number) => {
      const questions = await getQuestions(limit);

      set({
        questions
      });
    },
    selectAnswer: (questionId: Question["id"], answerIndex: number) => {
      const { questions } = get();

      const newQuestions = structuredClone(questions);
      const questionIndex = newQuestions.findIndex(q => q.id === questionId);
      const questionInfo = newQuestions[questionIndex];
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;

      if (isCorrectUserAnswer) confetti({
        particleCount: 100,
        spread:        70,
        origin:        {
          y: 0.6
        }
      });

      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex
      };

      set({
        questions: newQuestions
      });
    },

    goNextQuestion: () => {
      const { currentQuestion, questions } = get();

      if (currentQuestion < questions.length - 1) {
        set({
          currentQuestion: currentQuestion + 1
        });
      }
    },
    goPreviousQuestion: () => {
      const { currentQuestion } = get();

      if (currentQuestion > 0) {
        set({
          currentQuestion: currentQuestion - 1
        });
      }
    },
    resetGame: () => {
      set({
        questions:       [],
        currentQuestion: 0
      });
    }
  };
}, {
  name:    "questions",
  storage: createJSONStorage(() => sessionStorage) // Default is localStorage, no settings needed
}));

