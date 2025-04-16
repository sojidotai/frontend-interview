"use client";

import React, { useEffect, useState } from "react";
import useApiKey from "@/hooks/useApiKey";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { File, ChevronDown, Expand } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ChunkRAGPlus } from "@/lib/types";
import { baseUrl } from "@/lib/config";
import Markdown from "react-markdown";
import TableCard from "./table";
import ImageCard from "./image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ChunkCard = (props: ChunkRAGPlus) => {
  const [apiKey, _] = useApiKey();

  const percentage = `${(props.score * 100).toFixed(0)}%`;
  const pctToColor = (pct: number) => {
    if (pct > 0.8) {
      return "bg-green-200 text-green-900";
    } else if (pct > 0.5) {
      return "bg-yellow-200 text-yellow-900";
    } else {
      return "bg-red-200 text-red-900";
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 m-0 space-y-2 shadow-lg">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{props.documentName}</h2>
            <div className="flex space-x-4">
              {props.score > 0 && (
                <Badge
                  className={cn(pctToColor(props.score), "text-md font-medium")}
                >
                  {percentage}
                </Badge>
              )}
              {props.matches > 0 && (
                <Badge className="bg-gray-200 text-gray-900 text-md font-medium">
                  +{props.matches} hits
                </Badge>
              )}
            </div>
          </div>
          <Separator className="my-4" />
          <p>Pages: {props.meta?.page}</p>
          <Markdown className="text-sm prose max-w-full w-full">
            {props.content}
          </Markdown>
        </div>
        {props.table && (
          <TableCard
            {...props.table}
            documentName={props.documentName}
          ></TableCard>
        )}
        <Separator className="my-4" />
        {props.image && (
          <ImageCard
            {...props.image}
            documentName={props.documentName}
          ></ImageCard>
        )}
        <Separator className="my-4" />
        <div className="flex items-center justify-end space-x-2">
          <a
            href={`${baseUrl}/api/preview/document/${props.documentId}?page=${props.meta?.page}&api_key=${apiKey}#page=${props.meta?.page}`}
            target="_blank"
            className="py-2 px-3 rounded-md text-blue-600 underline flex items-center space-x-8 hover:bg-gray-100"
            rel="noopener noreferrer"
          >
            <File className="w-6 h-6 text-muted-foreground me-1" />
            {props.documentName}
          </a>
          {/* <span className="text-muted-foreground">Tags:</span> */}
        </div>
      </Card>
    </div>
  );
};

export default ChunkCard;
