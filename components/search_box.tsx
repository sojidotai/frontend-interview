import { Search, X } from "lucide-react";
import { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import useAutosizeTextArea from "@/lib/useAutosizeTextArea";

type SearchBoxProps = {
  onSearch: (query: string) => void;
  query: string;
  setQuery: (query: string) => void;
};

const SearchBox = (props: SearchBoxProps) => {
  const handleReset = () => props.setQuery("");
  const handleQueryInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    props.setQuery(e.target.value);
  };

  const handleTextInput = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      props.onSearch(props.query);
    }
  };

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, props.query);

  return (
    <div className="relative w-full">
      <Textarea
        rows={0}
        className="pt-3 pb-2 pr-4 pl-12 resize-none bg-white"
        placeholder="Search documents"
        value={props.query}
        onChange={handleQueryInputChange}
        onKeyDown={handleTextInput}
        ref={textAreaRef}
      />

      <Search className="absolute left-4 top-2.5 w-5 h-5 text-gray-500" />
      <button
        className="absolute right-3 top-2.5 text-gray-500"
        onClick={handleReset}
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchBox;
