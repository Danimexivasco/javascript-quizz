import { Typography } from "@mui/material";
import { emojiConfetti, fireWorks } from "../utils/confetti";
import { useEffect, useState } from "react";
import { useQuestionsStore } from "../store/questions";

type FinalMessageProps = {
  correct: number;
  incorrect: number;
};

export default function FinalMessage({ correct, incorrect }: FinalMessageProps) {
  const [result, setResult] = useState<"approved" | "suspense" | "draw" | "">("");
  const language = useQuestionsStore((state) => state.language);

  useEffect(() => {
    const approved = correct > incorrect;
    const suspense = correct < incorrect;
    const draw = correct === incorrect;

    setResult(approved ? "approved" : suspense ? "suspense" : "draw");

    if (approved) fireWorks();
    if (suspense) emojiConfetti("😭");
    if (draw) emojiConfetti("🟰");

  }, [correct, incorrect]);

  if (result === "approved") {
    return (
      <>
        <Typography variant="h4">{language === "en" ? "Well done!" : "Bien hecho!"}</Typography>
        <img
          src="/approved.webp"
          alt="approved!"
          style={{
            width: "100%"
          }}
        />
      </>
    );
  }

  if (result === "suspense") {
    return (
      <>
        <Typography variant="h4">{language === "en" ? "Best luck next time..." : "Suerte en la próxima..."}</Typography>
        <img
          src="/cry.webp"
          alt="crying man"
          style={{
            width: "100%"
          }}
        />
      </>
    );
  }

  if (result === "draw") {
    return (
      <>
        <Typography variant="h4">{language === "en" ? "Not bad but it's a draw..." : "No está mal pero es un empate..."}</Typography>
        <img
          src="/draw.webp"
          alt="draw"
          style={{
            width: "100%"
          }}
        />
      </>
    );
  }
}