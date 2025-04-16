"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { Image } from "@/lib/types";
import { getImageLink } from "@/lib/api";
import useApiKey from "@/hooks/useApiKey";

const ImageCard = (props: Image & { documentName: string }) => {
  const [apiKey, _] = useApiKey();
  const [isOpen, setIsOpen] = useState(false);
  const toggleTable = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <p className="text-medium font-semibold"> {props.title}</p>
        <div
          className="cursor-pointer hover:bg-gray-100 rounded-lg p-1 transition-transform"
          onClick={toggleTable}
        >
          <ChevronDown
            className={`size-7 text-muted-foreground transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out overflow-y-auto ${
          isOpen ? "max-h-[60vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <img
          src={getImageLink({ apiKey, imageId: props.id })}
          className="mt-4 w-full flex items-center justify-center"
        ></img>
      </div>
    </div>
  );
};

export default ImageCard;
