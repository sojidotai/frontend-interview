"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StringAccordion({ strings }: { strings: string[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const getFirstLine = (text: string) => {
        const firstLineBreak = text.indexOf("\n");
        return firstLineBreak !== -1 ? text.slice(0, firstLineBreak) : text;
    };

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="space-y-1">
            {strings.map((text, index) => (
                <div
                    key={index}
                    className="border rounded overflow-hidden text-xs"
                >
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-between p-4 text-left text-xs"
                        onClick={() => toggleItem(index)}
                    >
                        <span className="truncate">{getFirstLine(text)}</span>
                        {openIndex === index ? (
                            <ChevronUp className="h-4 w-4" />
                        ) : (
                            <ChevronDown className="h-4 w-4" />
                        )}
                    </Button>
                    {openIndex === index && (
                        <div className="p-4 bg-muted">{text}</div>
                    )}
                </div>
            ))}
        </div>
    );
}
