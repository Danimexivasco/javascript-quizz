import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { androidstudio } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { useQuestionsStore } from "./store/questions";

import { type Question as QuestionType } from "./types";

const Question = ({ question }: {question: QuestionType}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        mt:        4,
        textAlign: "left",
        p:         2
      }}
    >
      <Typography variant="h5">{question.question}</Typography>

      <SyntaxHighlighter
        language="typescript"
        style={androidstudio}
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
            <ListItemButton onClick={() => {}}>
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

  const question = questions[currentQuestion];

  return (
    <Question question={question}/>
  );
}