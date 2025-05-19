import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography
} from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { androidstudio } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { useQuestionsStore } from "../store/questions";

import type { Question as QuestionType } from "../types.d.ts";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useEffect } from "react";
import Footer from "./Footer";

const getBackgroundColor = (question: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = question;

  if (userSelectedAnswer == null) return "transparent";

  if (index !== correctAnswer && index !== userSelectedAnswer) return "transparent";

  if (index === correctAnswer) return "green";

  if (index === userSelectedAnswer) return "red";

  return "transparent";
};

const Question = ({ question }: {question: QuestionType}) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);

  const createHandleClick = (answerIndex: number) => () => selectAnswer(question.id, answerIndex);

  return (
    <Card
      variant="outlined"
      sx={{
        mt:        2,
        textAlign: "left",
        p:         2
      }}
    >
      <Typography variant="h5">{question.question}</Typography>

      <SyntaxHighlighter
        language="typescript"
        style={androidstudio}
        wrapLongLines
      >
        {question.code}
      </SyntaxHighlighter>

      <List
        sx={{
          bgcolor: "#333"
        }}
        disablePadding
      >
        {question.answers.map((answer, index) => (
          <ListItem
            key={index}
            disablePadding
            divider
          >
            <ListItemButton
              disabled={question.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{
                backgroundColor: getBackgroundColor(question, index)
              }}
            >
              <ListItemText
                primary={answer}
                sx={{
                  textAlign: "center"
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export function Game() {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion);
  const goPreviousQuestion = useQuestionsStore((state) => state.goPreviousQuestion);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") goPreviousQuestion();
    if (event.key === "ArrowRight") goNextQuestion();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goPreviousQuestion, goNextQuestion]);

  const question = questions[currentQuestion];

  return (
    <>
      <Stack
        direction={"row"}
        gap={2}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          mt: 4
        }}
      >
        <IconButton
          onClick={goPreviousQuestion}
          disabled={currentQuestion === 0}
        >
          <ArrowBack/>
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton
          onClick={goNextQuestion}
          disabled={currentQuestion === questions.length - 1}
        >
          <ArrowForward />
        </IconButton>
      </Stack>
      <Question question={question}/>
      <Footer />
    </>
  );
}