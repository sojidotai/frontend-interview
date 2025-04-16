import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Document } from "@/lib/types";
import { FilterIcon, Trash2, RotateCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CircularProgressBar } from "./circular-progress-bar";
import { Pagination } from "./ui/pagination";
import { reparseDocuments } from "@/lib/api";
import useApiKey from "@/hooks/useApiKey";
import { toast } from "sonner";

type UploadedFilesTableProps = {
  documents: Document[];
  totalPages: number;
  currentPage: number;
  currentSort: string;
  selectedIds: Record<number, boolean>;
  searchTerm: string;
  progress: number;
  onSelectionChanged: (ids: Record<number, boolean>) => void;
  onHandleSelectAll: (value: boolean) => void;
  onDelete: () => void;
  onPageChanged: (page: number) => void;
  onSearchChanged: (value: string) => void;
  onSortChanged: (value: string) => void;
};

function formatFileSize(fileSize: number | null): string {
  if (fileSize == null) {
    return "-";
  }

  return `${(fileSize / 1024 / 1024).toFixed(2)} MB`;
}

export function UploadedFilesTable(props: UploadedFilesTableProps) {
  const [apiKey, _] = useApiKey();
  let {
    documents,
    totalPages,
    currentPage,
    currentSort,
    selectedIds,
    searchTerm,
    progress,
    onSelectionChanged,
    onHandleSelectAll,
    onDelete,
    onPageChanged,
    onSearchChanged,
    onSortChanged,
  } = props;

  const handleChangeSelection = (id: number, value: boolean) => {
    let newValues = { ...selectedIds };
    newValues[id] = value;
    onSelectionChanged(newValues);
  };

  const anySelected = Object.values(selectedIds).find((x) => x);

  const handleReparse = async () => {
    try {
      await reparseDocuments({ apiKey });
      toast.success("Documents reparsing job has been queued");
    } catch (error) {
      toast.error("Failed to queue documents reparsement");
      console.error(error);
    } finally {
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Uploaded Files</CardTitle>

        <div className="flex ml-auto items-center">
          { progress != 100 && (
            <CircularProgressBar
              progress={progress}
              size={50}
              strokeWidth={5}
            />
          )}
          <Button onClick={handleReparse} className="mx-3">
            Re-index All Documents
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4 pt-8">
          <Input
            type="search"
            placeholder="Search"
            className="flex-1"
            defaultValue={searchTerm}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                onSearchChanged((e.target as HTMLInputElement).value);
              }
            }}
          />
          <Popover>
            <PopoverTrigger>
              <FilterIcon className="h-5 w-5 text-gray-500" />
            </PopoverTrigger>
            <PopoverContent>
              <label htmlFor="">Sort By:</label>
              <RadioGroup
                defaultValue={currentSort}
                onValueChange={(value) => {
                  onSortChanged(value);
                }}
              >
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="name" id="r1" />
                  <Label htmlFor="r1">Name</Label>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <RadioGroupItem value="date" id="r2" />
                  <Label htmlFor="r2">Date Uploaded</Label>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <RadioGroupItem value="size" id="r3" />
                  <Label htmlFor="r3">File Size</Label>
                </div>
              </RadioGroup>
            </PopoverContent>
          </Popover>
          {anySelected && (
            <Trash2
              className="h-5 w-5 text-gray-500 hover:text-red-500 cursor-pointer"
              onMouseDown={onDelete}
            />
          )}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  className="mr-2"
                  onCheckedChange={(value) => onHandleSelectAll(!!value)}
                />
              </TableHead>
              <TableHead>Filename</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>File Size</TableHead>
              <TableHead>Owner</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents?.map((document) => (
              <TableRow key={document.id}>
                <TableCell>
                  <Checkbox
                    id={`${document.id}`}
                    checked={selectedIds && selectedIds[document.id]}
                    onCheckedChange={(value) =>
                      handleChangeSelection(document.id, !!value)
                    }
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <Link
                    className="text-blue-400 underline cursor-pointer"
                    href={{
                      pathname: "/documentDetailView",
                      query: { id: document.id },
                    }}
                  >
                    {document.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge>{document.state}</Badge>
                </TableCell>
                <TableCell>
                  {new Date(document.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{formatFileSize(document.fileSize)}</TableCell>
                <TableCell>
                  <Avatar>
                    <AvatarFallback>DC</AvatarFallback>
                  </Avatar>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <div className="flex justify-between items-center px-4 pb-2">
        <div className="text-xs text-gray-500">
          Showing page {currentPage} of {totalPages}
        </div>
        <div className="flex space-x-2">
          <Pagination
             currentPage={currentPage}
             totalPages={totalPages}
             onPageChange={onPageChanged}
          />
        </div>
      </div>
    </Card>
  );
}
