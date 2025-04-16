"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

interface CodeBlockProps {
  code: string;
}

export default function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      code.replace(/(\r\n|\n|\r)/gm, "").replace(/\s+/g, " "),
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="relative rounded-lg bg-gray-900 p-4 overflow-x-auto pr-12">
      <pre className="font-mono text-sm text-white whitespace-pre-line break-all">
        <code>{code.trim()}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 rounded-md bg-primary hover:bg-secondary transition-colors duration-200"
        aria-label="Copy to clipboard"
      >
        {copied ? (
          <Check className="h-4 w-4 text-white" />
        ) : (
          <Copy className="h-4 w-4 text-white" />
        )}
      </button>
    </div>
  );
}
