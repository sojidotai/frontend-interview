'use client';

import { FileText } from 'lucide-react';

import { Card } from '@/components/ui/card';

import { useDocuments } from './api';
import DocumentProcessingCard from './document-processing-card';
import { LeasingDocument } from './types';

interface DocumentProcessingPopupProps {
    projectId: number;
    fileIds: number[];
}

export default function DocumentUploadWatcher({
    projectId,
    fileIds,
}: DocumentProcessingPopupProps) {
    const {
        data: documents,
        isLoading,
        error,
    } = useDocuments({
        projectId,
        ids: fileIds,
        limit: 10,
        skip: 0,
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-6">
                <p className="text-gray-600">Loading documents...</p>
            </div>
        );
    }

    if (error || !documents) {
        return (
            <div className="flex items-center justify-center p-6">
                <p className="text-red-600">
                    Error loading documents. Please try again.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 gap-4 pt-4">
            {documents?.results.map((doc: LeasingDocument) => (
                <div key={doc.id}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-zinc-500" />
                            <div>
                                <div className="text-sm">
                                    Document #{doc.id}
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-gray-400">
                            {new Date(doc.createdAt).toLocaleString()}
                        </p>
                    </div>
                    {doc && (
                        <div className="mt-3 text-sm text-gray-600">
                            <DocumentProcessingCard document={doc} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
