import { useEffect, memo } from "react";
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
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { androidstudio } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { useQuestionsStore } from "../store/questions";
import type { Question as QuestionType } from "../types.d.ts";
import Footer from "./Footer";

const getAnswerStatus = (question: QuestionType, index: number): "correct" | "wrong" | "neutral" => {
  const { userSelectedAnswer, correctAnswer } = question;

  if (userSelectedAnswer == null) return "neutral";

  if (index === correctAnswer) return "correct";
  if (index === userSelectedAnswer) return "wrong";

  return "neutral";
};

const Question = memo(({ question }: {question: QuestionType}) => {
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
      <Typography
        variant="h5"
        data-testid="question"
      >{question.question}
      </Typography>

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
              className={`answer-button ${getAnswerStatus(question, index)}`}
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
});

Question.displayName = "Question";

export function Game() {
  const questions = useQuestionsStore((state) => state.questions);
  const language = useQuestionsStore((state) => state.language);
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

  const question = questions[currentQuestion][language];

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
          aria-label="Go to previous question"
        >
          <ArrowBack/>
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton
          onClick={goNextQuestion}
          disabled={currentQuestion === questions.length - 1}
          aria-label="Go to next question"
        >
          <ArrowForward />
        </IconButton>
      </Stack>
      <Question
        key={question.id}
        question={question}
      />
      <Footer />
    </>
  );
}