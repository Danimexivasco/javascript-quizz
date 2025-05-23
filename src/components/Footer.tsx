import { Button, Stack, Typography } from "@mui/material";
import { useQuestionsData } from "../hooks/useQuestionsData";
import { useQuestionsStore } from "../store/questions";
import FinalMessage from "./FinalMessage";

export default function Footer() {
  const resetGame = useQuestionsStore((state) => state.resetGame);
  const questions = useQuestionsStore((state) => state.questions);
  const language = useQuestionsStore((state) => state.language);
  const { correct, incorrect, unanswered } = useQuestionsData();

  return (
    <Stack
      direction={"column"}
      gap={4}
    >
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        gap={4}
        justifyContent={"center"}
        sx={{
          mt: 4
        }}
      >
        <Typography
          variant="h6"
        >
          ✅{language === "en" ? "Correct" : "Correctas"}: {correct}
        </Typography>
        <Typography
          variant="h6"
        >
          ❌{language === "en" ? "Incorrect" : "Incorrectas"}: {incorrect}
        </Typography>
        <Typography
          variant="h6"
        >
          ❔{language === "en" ? "Unanswered" : "Sin responder"}: {unanswered}
        </Typography>
      </Stack>

      {correct + incorrect === questions.length && <FinalMessage
        correct={correct}
        incorrect={incorrect}
      />}

      <Button
        variant="contained"
        onClick={resetGame}
      >
        {language === "en" ? "Reset Game" : "Resetear juego"}
      </Button>
    </Stack>
  );
}