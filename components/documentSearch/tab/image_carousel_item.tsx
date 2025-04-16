import { cn } from "@/lib/utils";
import { File, ChevronDown, Expand, Minimize, Maximize } from "lucide-react";
import { MouseEventHandler } from "react";

type ImageCarouselItemProps = {
  id: number;
  name: string;
  src: string;
  setActiveCarouselItem: (id: number) => void;
  activeCarouselItem: number;
  isCarouselActive: () => boolean;
};

export function ImageCarouselItem(props: ImageCarouselItemProps) {
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
      <div className="w-full flex justify-between items-center">
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
      <img
        className="w-full h-full object-contain bg-gray-200"
        src={props.src}
      />
    </div>
  );
}
