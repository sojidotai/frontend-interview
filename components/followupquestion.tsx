// components/followupquestion.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FollowUpQuestionProps {
  text: string;
  onClick: (query: string) => void;
}

const FollowUpTags: React.FC<FollowUpQuestionProps> = ({ text, onClick }) => {
  const handleClick = () => {
    onClick(text);
  };

  return (
    <Button
      className={cn(
        "self-start mx-1 w-full outline-primary border-blue-500 flex bg-white text-gray-700 text-sm py-2",
        "hover:text-white hover:bg-blue-600",
      )}
      onClick={handleClick}
    >
      <p className="grow text-wrap w-4/5 text-left"> {text} </p>

      <ChevronRight className="h-4 w-4" />
    </Button>
  );
};

export default FollowUpTags;
