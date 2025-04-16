"use client";

import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const useTypingEffect = (
  text: string,
  duration: number,
  isTypeByLetter = false,
) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const items = isTypeByLetter ? text.split("") : text.split(" ");

  useEffect(() => {
    setCurrentPosition(0);
  }, [text]);

  useEffect(() => {
    if (currentPosition >= items.length) return;

    const intervalId = setInterval(() => {
      setCurrentPosition((prevPosition) => prevPosition + 1);
    }, duration);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentPosition, items, duration]);

  return items.slice(0, currentPosition).join(isTypeByLetter ? "" : " ");
};

const TIME_PER_LETTER = 6;

export const TextTypingEffectWithTextsFadeOut = ({
  text,
}: {
  text: string;
}) => {
  const [textIndex, setTextIndex] = useState(0);
  const [fadeText, setFadeText] = useState(true);
  const [fadeCircle, setFadeCircle] = useState(true);
  const textToShow = useTypingEffect(text, TIME_PER_LETTER, false);

  const timeToTypeText = text.split(" ").length * TIME_PER_LETTER;

  useEffect(() => {
    const circleTimeout = setTimeout(() => {
      setFadeCircle(false);
    }, timeToTypeText + 1000);

    return () => {
      clearTimeout(circleTimeout);
    };
  }, [textIndex]);

  return (
    <>
      <div
        className={`inline text-black duration-300 ${
          fadeText ? "opacity-1 translate-y-0" : "translate-y-2 opacity-0"
        }`}
        key={textIndex}
      >
        <span>
          <Markdown remarkPlugins={[remarkGfm]}>{textToShow}</Markdown>
          <span
            className={`ml-2 inline-block h-3 w-3 rounded-full bg-black duration-300 ${
              fadeCircle ? "" : "scale-0"
            }`}
          />{" "}
        </span>
      </div>
    </>
  );
};
