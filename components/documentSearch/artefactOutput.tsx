import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PDFHit } from "@/lib/types";
import Artefact from "./artefact";
import ArtefactButton from "./artefactButton";

type ArtefactOutputProps = {
  text: string;
  references: PDFHit[];
};

const ArtefactOutput = ({ text, references }: ArtefactOutputProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selected = references.find(
    (r) => selectedId && r.displayId == selectedId,
  );

  const replaceReferences = (text: string) => {
    const regex = /<<(\d+)>>/g;
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (index % 2 === 1) {
        const componentIndex = parseInt(part, 10);
        const pdfHit = references[componentIndex - 1];
        return (
          <ArtefactButton
            key={index}
            pdfHit={pdfHit}
            onClick={() => setSelectedId(pdfHit?.displayId)}
            selected={
              (selected && selected.displayId == pdfHit?.displayId) || false
            }
          />
        );
      }
      return part;
    });
  };

  return (
    <div className="flex flex-row gap-4">
      <div className="w-1/2">
        <Card className="mx-0">
          <CardHeader>
            <CardTitle>AI Response</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap">{replaceReferences(text)}</div>
          </CardContent>
        </Card>
      </div>
      {selected && (
        <div className="w-1/2">
          <Artefact artefact={selected} />
        </div>
      )}
    </div>
  );
};

export default ArtefactOutput;
