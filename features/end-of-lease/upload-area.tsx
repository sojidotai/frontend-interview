'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useCreateLeasingDocument } from '@/features/end-of-lease/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, FileIcon } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

import { uploadFile } from '@/lib/upload-utils';

import useApiKey from '@/hooks/useApiKey';

import { Button } from '@/components/ui/button';
import {
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { FileType } from '../file-overview/types';
import DocumentUploadWatcher from './document-upload-watcher';

const formSchema = z.object({
    file: z
        .any()
        .refine(
            (files) =>
                files instanceof FileList &&
                Array.from(files).every(
                    (file) => file.type === 'application/pdf',
                ),
            {
                message: 'Only PDF files are allowed',
            },
        )
        .refine((files) => files.length > 0, {
            message: 'Please select at least one file',
        }),
});

export function UploadArea({ projectId }: { projectId: number }) {
    const [apiKey, _] = useApiKey();
    const createLeasingDocument = useCreateLeasingDocument();
    const [loadingStates, setLoadingStates] = useState<{
        [key: string]: { isLoading: boolean; isDone: boolean };
    }>({});
    const [fileIds, setFileIds] = useState<number[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const fileRef = form.register('file');

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        if (data && data.file) {
            toast.info('Uploading Files... Do not reload or change the page');
            const files: File[] = Array.from(data.file);
            // Clear fileIds on new submission
            setFileIds([]);
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                setLoadingStates((prev) => ({
                    ...prev,
                    [file.name]: { isLoading: true, isDone: false },
                }));
                const fileId = await uploadFile(
                    apiKey,
                    file,
                    FileType.sb, // TODO: remove this
                );
                toast.promise(
                    createLeasingDocument.mutateAsync({ fileId, projectId }),
                    {
                        loading:
                            'Uploading Files... Do not reload or change the page',
                        success: 'Files uploaded successfully!',
                        error: 'Error uploading files',
                    },
                );
                setLoadingStates((prev) => ({
                    ...prev,
                    [file.name]: { isLoading: false, isDone: true },
                }));
                setFileIds((prev) => [...prev, fileId]);
            }
            form.reset();
        }
    };

    const hasFileSelected = (form.watch('file')?.length || 0) > 0;
    const selectedFiles: { name: string; size: number }[] = Array.from(
        form.watch('file') || [],
    );

    return (
        <div className="p-8 w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="file"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept=".pdf"
                                                multiple
                                                placeholder="shadcn"
                                                {...fileRef}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <div className="flex flex-col gap-1 my-1">
                            {selectedFiles.map((f) => (
                                <div
                                    key={f.name}
                                    className="bg-secondary/20 rounded-xl py-2 px-4 flex items-center gap-2"
                                >
                                    <FileIcon className="h-4 w-4 text-zinc-500" />
                                    <div className="flex-1 text-sm">
                                        <p>{f.name}</p>
                                        <p>{`${(f.size / 1024 / 1024).toFixed(2)} MB`}</p>
                                    </div>
                                    {loadingStates[f.name]?.isLoading && (
                                        <div className="relative h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-transparent dark:border-gray-700 dark:border-t-transparent" />
                                    )}
                                    {loadingStates[f.name]?.isDone && (
                                        <Check className="relative h-6 w-6 text-green-700" />
                                    )}
                                </div>
                            ))}
                        </div>

                        {fileIds.length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold">
                                    File IDs
                                </h3>
                                <DocumentUploadWatcher
                                    fileIds={fileIds}
                                    projectId={projectId}
                                />
                            </div>
                        )}
                    </CardContent>

                    <CardFooter>
                        <Button type="submit" disabled={!hasFileSelected}>
                            Submit
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </div>
    );
}
