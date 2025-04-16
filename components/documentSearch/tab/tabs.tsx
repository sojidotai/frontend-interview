import * as Tabs from "@radix-ui/react-tabs";
import { TabContent } from "./tab_content";

export function TabsDemo() {
  const content_1 = {
    document_name: "Bell Textron 505 Maintenance Planning Info.pdf",
    section_name: "Maintenance Planning Info",
    page_start: 133,
    page_end: 152,
    score: 1,
    matches: 21,
  };
  const content_2 = {
    document_name: "Bell Textron BHT-429-MPI Maintenance Planning Info.pdf",
    section_name: "Maintenance Planning Info",
    page_start: 133,
    page_end: 152,
    score: 0.74,
    matches: 11,
  };
  const content_3 = {
    document_name: "Bell Textron 123 Maintenance Planning Info.pdf",
    section_name: "Maintenance Planning Info",
    page_start: 144,
    page_end: 174,
    score: 0.49,
    matches: 2,
  };

  return (
    <Tabs.Root defaultValue="tab1">
      <Tabs.List className="inline-flex items-center justify-center rounded-md bg-muted text-muted-foreground">
        <Tabs.Trigger
          className="inline-flex items-center justify-center whitespace-nowrap rounded-lg rounded-b-none px-3 py-1.5 text-md font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:bg-white"
          value="tab1"
        >
          {content_1.document_name.substring(0, 16) + "..."}
        </Tabs.Trigger>
        <Tabs.Trigger
          className="inline-flex items-center justify-center whitespace-nowrap rounded-lg rounded-b-none px-3 py-1.5 text-md font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:bg-white"
          value="tab2"
        >
          {content_2.document_name.substring(0, 16) + "..."}
        </Tabs.Trigger>
        <Tabs.Trigger
          className="inline-flex items-center justify-center whitespace-nowrap rounded-lg rounded-b-none px-3 py-1.5 text-md font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:bg-white"
          value="tab3"
        >
          {content_3.document_name.substring(0, 16) + "..."}
        </Tabs.Trigger>
      </Tabs.List>
      <TabContent value="tab1" {...content_1}></TabContent>
      <TabContent value="tab2" {...content_2}></TabContent>
      <TabContent value="tab3" {...content_3}></TabContent>
    </Tabs.Root>
  );
}
