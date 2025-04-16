// components/chat/feedback-button.tsx
import React from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { UUID } from "crypto";
import { PositiveCheck } from "@/lib/types";

interface FeedbackProps {
  isPositive: boolean;
  positiveCheck: PositiveCheck;
  index: number;
  onClick: (
    isPositive: boolean,
    currentPositiveCheck: PositiveCheck,
    index: number,
  ) => void;
}

const FeedbackButton: React.FC<FeedbackProps> = ({
  isPositive,
  positiveCheck,
  index,
  onClick,
}) => {
  const handleClick = () => {
    onClick(isPositive, positiveCheck, index);
  };

  return (
    <button
      className="bg-none border-none cursor-pointer flex items-center p-1 hover:bg-gray-200 rounded-md"
      onClick={() => handleClick()}
    >
      {isPositive ? (
        <ThumbsUp
          color={positiveCheck.positive ? "#4CAF50" : "#D3D3D3"}
          size={20}
        />
      ) : (
        <ThumbsDown
          color={positiveCheck.positive === false ? "#F44336" : "#D3D3D3"}
          size={20}
        />
      )}
    </button>
  );
};

export default FeedbackButton;
