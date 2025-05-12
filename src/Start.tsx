import { Button } from "@mui/material";
import { useQuestionsStore } from "./store/questions";

const LIMIT_QUESTIONS = 10;

export function Start() {
  const fetchQuestions = useQuestionsStore(state => state.fetchQuestions);

  return (
    <Button
      onClick={() => fetchQuestions(LIMIT_QUESTIONS)}
      variant="contained"
    >Start
    </Button>
  );
}