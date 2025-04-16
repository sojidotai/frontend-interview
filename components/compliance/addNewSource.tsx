import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { CreateAdvisorySource } from "@/lib/types";

type AddNewSourceProps = {
  onSubmit: (source: CreateAdvisorySource) => void;
  onCancel: () => void;
};

const AddNewSource = (props: AddNewSourceProps) => {
  const [startUrl, setStartUrl] = useState("");
  const [maxAge, setMaxAge] = useState<Date | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onSubmit({ startUrl, maxAge: maxAge || new Date() });
  };

  return (
    <Dialog open={true} onOpenChange={props.onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Advisory Source</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="start-url">Start URL</Label>
          <Input
            id="start-url"
            placeholder="https://example.com/advisories"
            value={startUrl}
            onChange={(e) => setStartUrl(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="max-age">Max Age Date</Label>
          <div className="flex flex-row gap-2 text-sm">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {maxAge ? format(maxAge, "PPP") : "Pick a date"}
          </div>
          <div className="w-full flex justify-center">
            <Calendar mode="single" selected={maxAge} onSelect={setMaxAge} />
          </div>
        </div>
        <Button className="w-full" onClick={handleSubmit}>
          Add Source
        </Button>
      </DialogContent>
    </Dialog>
  );
};
export default AddNewSource;
