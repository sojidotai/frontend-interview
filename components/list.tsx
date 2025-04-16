import { ChevronRight, Dot } from "lucide-react";
import React from "react";

interface ListProps {
    list: string[];
}

const List: React.FC<ListProps> = ({ list }) => {
    const formattedList = list.map((item, index) => {
        const leadingDash = item.startsWith("-");
        const leadingEnumeration = item.match(/^(\d+\.|-|\*) /);

        return (
            <li key={index} className="flex items-start space-x-1">
                {(leadingDash || leadingEnumeration) && (
                    <ChevronRight className="h-4 w-4 text-zinc-600 mt-0.5 flex-shrink-0" />
                )}
                <p>
                    {item
                        .replace(/^- /, "")
                        .replace(/^\d+\. /, "")
                        .replace(/^\* /, "")}
                </p>
            </li>
        );
    });

    return <ul className="flex flex-col gap-1">{formattedList}</ul>;
};

export default List;
