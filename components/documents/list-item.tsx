import { Trash2 } from 'lucide-react';

import { DocumentStats } from '@/lib/types';
import { cn } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';

import { Button } from '../ui/button';

type ListItemProps = {
    document: DocumentStats;
    className?: string;
    onClick?: () => void;
    onDelete?: () => void;
};

export const ListItem = ({
    document,
    className,
    onClick,
    onDelete,
}: ListItemProps) => {
    const normalizeFileSize = (bytes: number) => {
        if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(1)} MB`;
        return `${(bytes / 1e3).toFixed(0)} KB`;
    };

    return (
        <div
            className={cn(
                'p-3 rounded-xl transition-all hover:bg-muted/50',
                className,
            )}
            onClick={onClick}
        >
            <div className="flex items-center justify-between gap-2">
                {/* Primary Information */}
                <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 truncate">
                            <h3 className="font-medium truncate text-sm">
                                {document.sbTitle || document.name}
                            </h3>
                            <Badge
                                variant={
                                    document.state === 'ok'
                                        ? 'default'
                                        : 'destructive'
                                }
                                className="shrink-0 text-xs"
                            >
                                {document.state.toUpperCase()}
                            </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground shrink-0">
                            {new Date(document.updatedAt).toLocaleDateString()}
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2 truncate">
                            <span className="font-medium">
                                {document.engineModel}
                            </span>
                            <span>•</span>
                            <span>{document.ataChapterTitle}</span>
                            <span>•</span>
                            <span className="font-mono">
                                {document.sbNumber}
                            </span>
                            <span>•</span>
                            <span>
                                Rev. {document.revision}
                                {document.isLatestRevision && ' (Latest)'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <span>{normalizeFileSize(document.fileSize)}</span>
                            {document.chapterCount === 0 && (
                                <span className="text-red-600">⚠️ Empty</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Delete Button */}
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
    );
};
