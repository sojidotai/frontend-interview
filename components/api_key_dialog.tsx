import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import useApiKey from "@/hooks/useApiKey";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function ApiKeyDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [apiKey, setApiKey, _] = useApiKey();
  const [newApiKey, setNewApiKey] = useState("");

  useEffect(() => {
    if (apiKey !== newApiKey) {
      setNewApiKey(apiKey);
    }
  }, [apiKey]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewApiKey(e.target.value);
  };

  const handleSave = () => {
    setApiKey(newApiKey);
    toast("API key updated");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader onAbort={onClose}>
          <DialogTitle>Set API Key</DialogTitle>
          <DialogDescription>
            This will change your API key. The API key will be used to
            authenticate your requests.
          </DialogDescription>
        </DialogHeader>
        <Input value={newApiKey} onChange={handleInputChange} />
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
