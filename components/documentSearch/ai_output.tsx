import { TextTypingEffectWithTextsFadeOut } from "@/components/text_typing_effect";
import { Card } from "@/components/ui/card";
import "./blockquote.module.css";
import Markdown from "react-markdown";

type AIOutputProps = {
  text: string;
};

const generateReferences = (text: string) => {
  const referencePattern = /\[(\d+)\]/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = referencePattern.exec(text)) !== null) {
    const index = match.index;
    const referenceId = match[1];

    // Push the text before the reference
    if (index > lastIndex) {
      parts.push(text.slice(lastIndex, index));
    }

    // Push the reference itself
    parts.push(
      <sup
        key={referenceId}
        className="text-sky-700 px-1/2 hover:text-white animate-pulse"
      >
        [{referenceId}]
      </sup>,
    );

    // Update the last index
    lastIndex = referencePattern.lastIndex;
  }

  // Push any remaining text after the last reference
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
};

export default function AIOutput(props: AIOutputProps) {
  return (
    <Card className="m-0 p-4 w-full animate-grow shadow-lg">
      <p className="text-slate-800 leading-relaxed text-sm prose w-full max-w-full">
        <Markdown>{props.text}</Markdown>
      </p>
    </Card>
  );
}
