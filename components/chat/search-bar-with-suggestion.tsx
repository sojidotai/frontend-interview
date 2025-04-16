import { DbConversationHeader } from "@/lib/types";
import { UUID } from "crypto";
import { X } from "lucide-react";
import React, { useState } from "react";

type SearchBarProps = {
  query: string;
  listConversationHeaders: DbConversationHeader[];
  onSearch: (query: string) => void;
  onClick: (id: UUID) => void;
};

const SearchBarWithSuggestions: React.FC<SearchBarProps> = ({
  query,
  onSearch,
  onClick,
  listConversationHeaders,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearch(value);
  };

  const handleClear = () => {
    onSearch("");
  };

  const handleSuggestionClick = (query: string, id: UUID) => {
    onSearch(query);
    onClick(id);
  };

  return (
    <div className="relative w-full mx-auto">
      <div className="flex items-center rounded-full px-8 w-full">
        <input
          type="text"
          className={`flex-grow px-4 py-2 rounded-full outline-none text-sm`}
          placeholder="Search recent conversation"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {query && (
          <button className="focus:outline-none px-2" onClick={handleClear}>
            <X></X>
          </button>
        )}
      </div>
      {isFocused && listConversationHeaders.length > 0 && (
        <ul className="absolute top-full left-8 right-8 bg-white border border-gray-300 rounded-lg shadow-lg mt-2 z-10 ">
          {listConversationHeaders
            .slice(0, 5)
            .map((header: DbConversationHeader) => (
              <li
                key={header.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onMouseDown={() =>
                  handleSuggestionClick(header.title, header.id)
                }
              >
                {header.title}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBarWithSuggestions;
