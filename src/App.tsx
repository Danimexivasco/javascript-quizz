import "./App.css";
import { Container, Stack, Typography } from "@mui/material";
import { JSIcon } from "./components/icons/js";
import { Start } from "./components/Start";
import { useQuestionsStore } from "./store/questions";
import { Game } from "./components/Game";

function App() {
  const questions = useQuestionsStore((state) => state.questions);

  return (
    <main>
      <Container maxWidth="sm">

        <Stack
          direction={{
            xs: "column",
            md: "row"
          }}
          spacing={2}
          alignItems="center"
          justifyContent={"center"}
        >
          <JSIcon />
          <Typography
            variant="h2"
            component="h1"
          >
            JavaScript Quizz
          </Typography>

        </Stack>
        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}

      </Container>
    </main>
  );
}

export default App;
