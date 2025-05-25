import { Button, Slider, Stack, Typography } from "@mui/material";
import { useQuestionsStore } from "../store/questions";
import {
  MAX_QUESTIONS,
  DEFAULT_QUESTIONS,
  MIN_QUESTIONS
} from "../utils/constants";
import { useState } from "react";

function valueText(value: number) {
  return `${value} questions`;
}

const marks = [
  {
    value: MIN_QUESTIONS,
    label: MIN_QUESTIONS
  },
  {
    value: MAX_QUESTIONS,
    label: MAX_QUESTIONS
  }
];

export function Start() {
  const fetchQuestions = useQuestionsStore(state => state.fetchQuestions);
  const language = useQuestionsStore(state => state.language);
  const [numberOfQuestions, setNumberOfQuestions] = useState(DEFAULT_QUESTIONS);

  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Typography
        variant="h6"
        component={"p"}
        sx={{
          mt: 4
        }}
      >{language === "en" ? "Select the number of questions" : "Seleccione el número de preguntas"}
      </Typography>
      <Slider
        defaultValue={DEFAULT_QUESTIONS}
        aria-label={language === "en" ? "Select the number of questions" : "Seleccione el número de preguntas"}
        getAriaValueText={valueText}
        valueLabelDisplay="auto"
        shiftStep={30}
        step={1}
        marks={marks}
        min={2}
        max={MAX_QUESTIONS}
        onChange={(_, value) => setNumberOfQuestions(value as number)}
        sx={{
          maxWidth: "80%"
        }}
      />
      <Button
        onClick={() => fetchQuestions(numberOfQuestions)}
        variant="contained"
        sx={{
          mt: 4
        }}
      >{language === "en" ? "Start" : "Comenzar"}
      </Button>
    </Stack>
  );
}