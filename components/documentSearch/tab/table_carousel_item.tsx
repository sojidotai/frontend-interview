import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Maximize, Minimize } from "lucide-react";

import { MouseEventHandler } from "react";
import { cn } from "@/lib/utils";

type TableCarouselItemProps = {
  id: number;
  name: string;
  data: any[];
  setActiveCarouselItem: (id: number) => void;
  activeCarouselItem: number;
  isCarouselActive: () => boolean;
};

export function TableCarouselItem(props: TableCarouselItemProps) {
  const header = props.data[0].cells;
  const rows = props.data.slice(1).map((item) => item.cells);

  const handleOnClick: MouseEventHandler = (_) => {
    isActive()
      ? props.setActiveCarouselItem(0)
      : props.setActiveCarouselItem(props.id);
  };

  const isActive = () => {
    return props.id == props.activeCarouselItem;
  };
  return (
    <div
      className={cn(
        "group flex-none flex flex-col overflow-hidden space-y-1 rounded-lg p-2 transition-all ease-in-out duration-1000",
        isActive() ? "w-full max-w-full" : "",
        props.isCarouselActive() && !isActive()
          ? "w-0 max-h-0 p-0 opacity-0"
          : "max-h-full",
        !props.isCarouselActive() && !isActive() ? "w-2/5 max-w-2/5" : "",
      )}
    >
      <div className="flex justify-between items-center">
        <h4
          className={cn(
            "w-full text-lg font-semibold",
            props.isCarouselActive() && !isActive()
              ? "text-nowrap text-clip"
              : "",
          )}
        >
          {props.name}
        </h4>
        <button onClick={handleOnClick}>
          {isActive() ? (
            <Minimize className="p-2 size-10 rounded-full hover:cursor-pointer hover:bg-gray-200" />
          ) : (
            <Maximize className="p-2 size-10 rounded-full hover:cursor-pointer hover:bg-gray-200" />
          )}
        </button>
      </div>
      <div className="group-hover:overflow-auto">
        <table className="text-sm w-full">
          <TableHeader>
            <TableRow>
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
        </table>
      </div>
    </div>
  );
}
