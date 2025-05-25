import "./App.css";
import { Button, Container, Stack, Typography } from "@mui/material";
import { JSIcon } from "./components/icons/js";
import { Start } from "./components/Start";
import { useQuestionsStore } from "./store/questions";
import { Game } from "./components/Game";
import SpaingFlag from "./components/flags/Spain";
import UsaFlag from "./components/flags/Usa";

function App() {
  const questions = useQuestionsStore((state) => state.questions);
  const language = useQuestionsStore((state) => state.language);
  const setLanguage = useQuestionsStore((state) => state.setLanguage);

  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          gap={2}
          sx={{
            mb: 4
          }}
          justifyContent="center"
        >
          <Button
            variant={language === "en" ? "contained" : "outlined"}
            startIcon={<UsaFlag />}
            aria-selected={language === "en"}
            onClick={() => setLanguage("en")}
          >
            EN
          </Button>
          <Button
            variant={language === "es" ? "contained" : "outlined"}
            startIcon={<SpaingFlag />}
            aria-selected={language === "es"}
            onClick={() => setLanguage("es")}
          >
            ES
          </Button>
        </Stack>
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
