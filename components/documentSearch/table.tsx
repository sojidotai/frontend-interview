"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { File, ChevronDown, ChevronUp, Expand } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Table as TableType } from "@/lib/types";
import "./table.module.css";

const TableCard = (props: TableType & { documentName: string }) => {
  const [isOpen, setIsOpen] = useState(true); // State to manage table visibility
  const header = props.data[0].cells;
  const rows = props.data.slice(1).map((item) => item.cells);

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
        <Table className="mt-4 rounded-table shadow-lg">
          <TableHeader>
            <TableRow className="bg-gray-200 rounded-lg">
              {header.map((cell: any, index: number) => (
                <TableHead key={index}>{cell}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell: any, cellIndex: number) => (
                  <TableCell key={cellIndex}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TableCard;
