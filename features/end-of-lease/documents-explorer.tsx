'use client';

import type { LeasingDocument } from '@/features/end-of-lease/types';
import { Folder, Link } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface DocumentsExplorerProps {
    documents: LeasingDocument[];
    onSelectDocument: (document: LeasingDocument) => void;
    selectedDocumentId?: number;
    onDeleteDocument?: (document: LeasingDocument) => void;
}

export function DocumentsExplorer({
    documents,
    onSelectDocument,
    selectedDocumentId,
    onDeleteDocument,
}: DocumentsExplorerProps) {
    const getStatusStyles = (document: LeasingDocument) => {
        const status = document.status || 'processing';
        switch (status.toLowerCase()) {
            case 'pending':
                return {
                    iconColor: 'text-amber-300',
                    badgeClass:
                        'bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-400',
                };
            case 'processing':
                return {
                    iconColor: 'text-blue-500',
                    badgeClass: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
                };
            case 'complete':
                return {
                    iconColor: 'text-green-500',
                    badgeClass:
                        'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-400',
                };
            default:
                return {
                    iconColor: 'text-zinc-500',
                    badgeClass: 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200',
                };
        }
    };

    return (
        <div className="space-y-4">
            {/* File Explorer Grid */}
            <div className="p-4">
                {documents.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No documents found
                    </div>
                ) : (
                    <div className="grid grid-cols-4 gap-4">
                        {documents.map((document) => {
                            const { iconColor, badgeClass } =
                                getStatusStyles(document);

                            return (
                                <Card
                                    key={document.id}
                                    className={cn(
                                        'relative flex flex-col p-4 rounded-lg cursor-pointer transition-all duration-300',
                                        'hover:shadow-md bg-white',
                                        selectedDocumentId === document.id
                                            ? 'shadow-md ring-2 ring-primary/30'
                                            : 'shadow-sm',
                                    )}
                                    onClick={() => onSelectDocument(document)}
                                >
                                    <div className="flex flex-col items-center mt-4">
                                        <Folder
                                            className={cn(
                                                'h-10 w-10',
                                                iconColor,
                                            )}
                                        />
                                    </div>

                                    <div className="mt-3">
                                        <div className="font-medium text-xs truncate">
                                            {document.raw?.title?.value ||
                                                'SB Document'}
                                        </div>
                                        <div className="flex flex-row justify-between mt-1">
                                            <div className="text-xs text-gray-500 truncate w-24 font-mono">
                                                {document.raw?.id.value}
                                            </div>
                                            <div className="text-xs flex flex-row gap-1 justify-center">
                                                <Link
                                                    className={cn(
                                                        'size-3',
                                                        !!document.connectedDocuments
                                                            ? 'text-green-600'
                                                            : 'text-zinc-400',
                                                    )}
                                                />
                                                <div
                                                    className={cn(
                                                        !!document.connectedDocuments ||
                                                            'text-zinc-400',
                                                    )}
                                                >
                                                    {document.connectedDocuments
                                                        ?.length || 0}{' '}
                                                    EOs
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
