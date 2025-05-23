import { useQuestionsStore } from "../store/questions";

export const useQuestionsData = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const language = useQuestionsStore((state) => state.language);

  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  questions.forEach((question) => {
    const { userSelectedAnswer, correctAnswer } = question[language];

    if (userSelectedAnswer == null) unanswered++;
    else if (userSelectedAnswer === correctAnswer) correct++;
    else incorrect++;
  });

  return {
    correct,
    incorrect,
    unanswered
  };
};