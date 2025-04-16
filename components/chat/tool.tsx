import {
  Cpu,
  BoxSelect,
  FileText,
  LibraryBig,
  Microscope,
  Sparkles,
  TextSearch,
} from "lucide-react";
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";

type ToolProps = {
  name: string;
  input: string;
};

const iconStyle = "w-5 h-5 text-primary";
const getIcon = (name: string): React.ReactNode => {
  switch (name.toLowerCase()) {
    case "keyword search":
      return <TextSearch className={iconStyle} />;
    case "ai search":
      return <Sparkles className={iconStyle} />;
    case "document preview":
      return <FileText className={iconStyle} />;
    case "document analysis":
      return <Microscope className={iconStyle} />;
    case "document search":
      return <LibraryBig className={iconStyle} />;
    case "parallel agent":
      return <Cpu className={iconStyle} />;
    default:
      return <BoxSelect />;
  }
};
const getName = (name: string): string => {
  switch (name.toLowerCase()) {
    case "keyword search":
      return "Search";
    case "ai search":
      return "Search";
    case "document preview":
      return "Inspecting PDF";
    case "document analysis":
      return "Analysing PDF";
    case "document search":
      return "Searching for PDFs";
    default:
      return "Thinking";
  }
};

const Tool: React.FC<ToolProps> = ({ name, input }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex flex-row gap-2 items-center justify-end">
            {getIcon(name)}
            <div className="text-sm font-mono text-xs">{getName(name)}</div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="bg-white shadow p-2 rounded-xl text-sm font-mono text-xs">
            {input}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Tool;
