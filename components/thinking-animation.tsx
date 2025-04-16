"use client";

import { cn } from "@/lib/utils";
import { Plane, FileText, Search } from "lucide-react";
import { useState, useEffect } from "react";

export function ThinkingAnimation() {
  const [activeIcon, setActiveIcon] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIcon((prev) => (prev + 1) % 3);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const icons = [{ Icon: Plane }, { Icon: Search }, { Icon: FileText }];

  return (
    <div className="flex items-center justify-center space-x-4">
      {icons.map(({ Icon }, index) => (
        <div
          key={index}
          className={cn(
            "transition-all duration-1000 ease-in-out",
            activeIcon === index
              ? "scale-125 opacity-100 text-secondary"
              : "scale-100 opacity-50 text-zinc-300",
          )}
        >
          <Icon className={`w-6 h-6`} />
        </div>
      ))}
    </div>
  );
}
