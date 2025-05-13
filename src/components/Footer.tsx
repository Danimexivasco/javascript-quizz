import { Button, Stack, Typography } from "@mui/material";
import { useQuestionsData } from "../hooks/useQuestionsData";
import { useQuestionsStore } from "../store/questions";

export default function Footer() {
  const resetGame = useQuestionsStore((state) => state.resetGame);
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
          ✅Correct: {correct}
        </Typography>
        <Typography
          variant="h6"
        >
          ❌Incorrect: {incorrect}
        </Typography>
        <Typography
          variant="h6"
        >
          ❔Unanswered: {unanswered}
        </Typography>
      </Stack>
      <Button
        variant="contained"
        onClick={resetGame}
      >
        Resetear juego
      </Button>
    </Stack>
  );
}