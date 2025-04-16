import * as Tabs from "@radix-ui/react-tabs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import Markdown from "react-markdown";
import { TableCarouselItem } from "./table_carousel_item";
import { ImageCarouselItem } from "./image_carousel_item";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { File } from "lucide-react";

type TabContentProps = {
  value: string;
  document_name: string;
  section_name: string;
  page_start: number;
  page_end: number;
  score: number;
  matches: number;
};
export function TabContent(props: TabContentProps) {
  const data = [
    {
      cells: [
        "Task No.",
        "Task Type",
        "Description",
        "Reference (DMC)",
        "Zone",
        "Access",
        "Initials",
      ],
    },
    {
      cells: [
        "18-10-00-001",
        "DET",
        "Do a detailed inspection of the tail damper assembly.",
        "505-A-18-60-20-00A-281A-A",
        "310",
        "N/A",
      ],
    },
    {
      cells: [
        "18-10-00-001",
        "DET",
        "Do a detailed inspection of the tail damper assembly.",
        "505-A-18-60-20-00A-281A-A",
        "310",
        "N/A",
      ],
    },
    {
      cells: [
        "18-10-00-001",
        "DET",
        "Do a detailed inspection of the tail damper assembly.",
        "505-A-18-60-20-00A-281A-A",
        "310",
        "N/A",
      ],
    },
    {
      cells: [
        "18-10-00-001",
        "DET",
        "Do a detailed inspection of the tail damper assembly.",
        "505-A-18-60-20-00A-281A-A",
        "310",
        "N/A",
      ],
    },
  ];
  const table_1 = {
    name: "Table 1. 1200 Flight Hours Inspection",
    data: data,
  };
  const table_2 = {
    name: "Table 2. 500 Flight Hours Inspection",
    data: data,
  };
  const image_1 = {
    name: "Figure 1. 500 Flight Hours Inspection",
    src: "https://media.tenor.com/dlzYGThHPRwAAAAe/cat-nerd.png",
  };
  const [activeCarouselItem, setActiveCarouselItem] = useState(0);

  const expandHandler = (id: number) => {
    setActiveCarouselItem(id);
  };

  const isCarouselActive = () => {
    return activeCarouselItem != 0;
  };

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
    <Tabs.Content
      className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      value={props.value}
    >
      <Card className="m-0 rounded-tl-none shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold">
              {props.document_name}
            </CardTitle>
            <div className="flex space-x-4">
              <Badge
                className={cn(pctToColor(props.score), "text-md font-medium")}
              >
                {percentage}
              </Badge>
              <Badge className="bg-gray-200 text-gray-900 text-md font-medium">
                +{props.matches} hits
              </Badge>
            </div>
          </div>

          <Separator />
          <CardDescription>
            <div className="grid grid-cols-8 gap-x-4 gap-y-1">
              <div className="odd:font-semibold text-end">Section:</div>
              <div className="odd:font-semibold col-span-7">
                {props.section_name}
              </div>
              <div className="odd:font-semibold text-end">Pages:</div>
              <div className="odd:font-semibold col-span-7">{`${props.page_start} - ${props.page_end}`}</div>
              <div className="odd:font-semibold text-end">Content:</div>
              <div className="odd:font-semibold col-span-7">
                2 tables, 1 figure
              </div>
              <div className="grid grid-cols-8 gap-x-4 col-span-8 items-center">
                <div className="font-semibold text-end">Referenced PDF:</div>
                <div className="group col-span-7 hover:cursor-pointer">
                  <a
                    // href={`${baseUrl}/api/preview/document/${props.documentId}?page=${props.meta?.page}&api_key=${apiKey}#page=${props.meta?.page}`}
                    target="_blank"
                    className="rounded-md text-blue-600 underline flex items-center space-x-8 font-medium group-hover:font-semibold"
                    rel="noopener noreferrer"
                  >
                    <File className="w-6 h-6 text-muted-foreground me-1" />
                    {props.document_name}
                  </a>
                  {/* <span className="text-muted-foreground">Tags:</span> */}
                </div>
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Markdown>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab placeat
            adipisci labore quam veritatis facilis esse cupiditate sapiente odit
            quas, quis neque suscipit facere eligendi accusamus omnis dolor
            optio consectetur ducimus recusandae quidem necessitatibus, libero
            quae praesentium. Excepturi illo sed blanditiis illum! Quo inventore
            corporis deserunt rerum, excepturi recusandae repudiandae esse ipsa
            obcaecati aliquam impedit eum provident fugiat omnis, eveniet
            dolores mollitia dicta, libero iure ratione veritatis possimus a in
            quis! Nihil iste ratione omnis pariatur cupiditate. Ratione
            provident nulla laudantium, distinctio libero unde mollitia magni
            pariatur asperiores nostrum praesentium fugiat molestias ipsum
            perferendis voluptatibus excepturi eos ullam suscipit possimus
            inventore sit. Itaque fugit et dolor expedita. Laborum illum sequi
            quibusdam a, pariatur, aspernatur tempora architecto autem excepturi
            totam provident aut vel odit qui facilis veritatis doloribus ut.
            Pariatur, debitis. Dolorem, asperiores modi iste enim a tempore
            optio ad blanditiis harum quidem et, labore similique cupiditate
            pariatur eveniet aspernatur natus voluptatibus inventore quibusdam
            voluptas veniam? Deleniti ea, laborum magnam ipsa praesentium
            provident in maxime, exercitationem modi illo earum ut libero nobis
            voluptate expedita velit quos, saepe eos incidunt doloribus
            laudantium beatae quia a minus? Nulla autem in, illum sequi
            doloribus officia quod similique, adipisci vel, voluptatibus unde
            laborum. Maiores, veritatis!
          </Markdown>
          <Separator />
        </CardContent>
        <CardFooter>
          <div
            className={cn(
              "relative pb-2 flex snap-x transition-all ease-in-out duration-[5000ms] w-full",
              isCarouselActive()
                ? "max-h-[60vh] overflow-hidden"
                : "max-h-96 space-x-6 overflow-x-auto",
            )}
          >
            <TableCarouselItem
              id={1}
              {...table_1}
              activeCarouselItem={activeCarouselItem}
              isCarouselActive={isCarouselActive}
              setActiveCarouselItem={expandHandler}
            ></TableCarouselItem>
            {!isCarouselActive() && <Separator orientation="vertical" />}
            <TableCarouselItem
              id={2}
              {...table_2}
              activeCarouselItem={activeCarouselItem}
              isCarouselActive={isCarouselActive}
              setActiveCarouselItem={expandHandler}
            ></TableCarouselItem>
            {!isCarouselActive() && <Separator orientation="vertical" />}
            <ImageCarouselItem
              id={3}
              {...image_1}
              activeCarouselItem={activeCarouselItem}
              isCarouselActive={isCarouselActive}
              setActiveCarouselItem={expandHandler}
            ></ImageCarouselItem>
          </div>
        </CardFooter>
      </Card>
    </Tabs.Content>
  );
}
