'use client';

import { TicketIngestionJob } from '@/features/maintenance/types';
import { FileSpreadsheet, Trash2 } from 'lucide-react';

import { formatBytes, formatDate } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TicketIngestionListItemProps {
    job: TicketIngestionJob;
    onClick?: () => void;
    onDelete?: () => void;
}

export function TicketIngestionListItem({
    job,
    onDelete,
    onClick,
}: TicketIngestionListItemProps) {
    return (
        <div
            className="border rounded-md p-4 hover:bg-muted/50 transition-colors"
            onClick={onClick}
        >
            <div className="flex justify-between items-start">
                <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                        <FileSpreadsheet className="h-5 w-5 text-green-500" />
                        <h2 className="font-medium text-lg">{job.filename}</h2>
                        {job.ingestionComplete ? (
                            <Badge
                                variant="default"
                                className="rounded-full bg-primary/10 text-primary border-primary/20"
                            >
                                OK
                            </Badge>
                        ) : (
                            <Badge
                                variant="default"
                                className="rounded-full bg-amber-100 text-amber-800 border-amber-200"
                            >
                                Pending
                            </Badge>
                        )}
                    </div>

                    <div className="flex items-center gap-2 mb-1">
                        <Badge
                            variant="default"
                            className="bg-green-100 text-green-800 border-green-200"
                        >
                            CSV
                        </Badge>
                    </div>

                    <div className="text-sm text-muted-foreground flex flex-wrap gap-x-2 gap-y-1">
                        <span>{job.numRowsIngested} rows ingested</span>
                        <span>•</span>
                        <span>{job.numRowsFailed} rows failed</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                            {formatDate(job.createdAt)}
                        </div>
                        <div className="font-medium">
                            {formatBytes(job.fileSize)}
                        </div>
                    </div>
                    {onDelete && (
                        <Button
                            variant="link"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete();
                            }}
                        >
                            <Trash2 className="h-5 w-5 text-amber-600 hover:scale-105 transition-all" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
