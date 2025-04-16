"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { uploadDomainKnowledgeFiles } from "@/lib/api"
import useApiKey from "@/hooks/useApiKey"
import { toast } from "sonner"

export function FileUploadDialog() {
    const [apiKey, _] = useApiKey();
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState<File | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    };

    const handleUpload = async () => {
        if (file) {
            console.log("Uploading file:", file.name);
            setOpen(false);

            await uploadDomainKnowledgeFiles({
                apiKey,
                files: [file],
            });

            setFile(null);
            toast.success('Files uploaded successfully');
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="outline">Upload File</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="file" className="text-right">
                        File
                    </Label>
                    <Input id="file" type="file" className="col-span-3" onChange={handleFileChange} />
                </div>
            </div>
            <Button onClick={handleUpload} disabled={!file}>
                Upload
            </Button>
        </DialogContent>
        </Dialog>
    )
}
