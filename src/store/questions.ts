import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BilingualQuestion, Language, Question } from "../types";

// import { devtools } from "zustand/middleware"; // Devtools can be used with redux devtools chrome extension
import { getQuestions } from "../services/questions";
import { fireConfetti } from "../utils/confetti";

type State = {
  questions: BilingualQuestion[];
  currentQuestion: number;
  language: Language;
  setLanguage: (_lang: Language) => void;
  fetchQuestions: (_limit: number) => Promise<void>;
  selectAnswer: (_questionId: Question["id"], _answerIndex: number) => void,
  goNextQuestion: () => void,
  goPreviousQuestion: () => void,
  resetGame: () => void
};

// Logger middleware example
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
    language:        "en",
    setLanguage:     (lang: Language) => set({
      language: lang
    }),
    fetchQuestions: async (limit: number) => {
      const questions = await getQuestions(limit);

      set({
        questions
      });
    },
    selectAnswer: (questionId: Question["id"], answerIndex: number) => {
      const { questions, language } = get();

      const newQuestions = structuredClone(questions);
      const questionIndex = newQuestions.findIndex(q => q[language].id === questionId);
      const question = newQuestions[questionIndex];
      const isCorrectUserAnswer = question[language].correctAnswer === answerIndex;

      if (isCorrectUserAnswer) fireConfetti();

      newQuestions[questionIndex] = {
        "en": {
          ...question.en,
          isCorrectUserAnswer,
          userSelectedAnswer: answerIndex
        },
        "es": {
          ...question.es,
          isCorrectUserAnswer,
          userSelectedAnswer: answerIndex
        }
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
  name: "questions"
  // storage: createJSONStorage(() => sessionStorage) // Default is localStorage, no settings needed
}));

