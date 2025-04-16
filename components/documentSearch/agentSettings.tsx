"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

type AgentSettingsProps = {
  selected: string;
  onChangeSelection: (model: string) => void;
};

const AGENTS = [
  "Chain of Thought",
  "Parallel Chain of Thoughts",
  "Tree of Thought",
];

export function AgentSettings({
  selected,
  onChangeSelection,
}: AgentSettingsProps) {
  const handleSelect = (m: string) => onChangeSelection(m);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex flex-row items-center gap-2 bg-white"
        >
          <div>{selected}</div>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {AGENTS.map((o) => (
          <DropdownMenuItem onClick={() => handleSelect(o)} key={o}>
            <div>{o}</div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
