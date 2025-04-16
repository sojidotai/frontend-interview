import { UploadProgress } from '@/lib/types';

import { CircularProgress } from '@/components/ui/circular-progress';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface IndexingProgressProps {
    progress: UploadProgress;
}

export default function IndexingProgress({
    progress: { progress, total, indexingCount },
}: IndexingProgressProps) {
    const isIndexing = progress > 0 && progress < 100;
    const indexedCount = Math.round((progress / 100) * total);

    return (
        <Tooltip>
            <TooltipTrigger className="flex items-center gap-2 px-4 py-2 hover:bg-secondary/20 rounded transition-colors">
                <CircularProgress
                    value={progress}
                    size={6}
                    strokeWidth={1}
                    className="h-4 w-4"
                />
                <span className="text-sm font-medium">
                    {isIndexing
                        ? 'Indexing'
                        : progress === 100
                          ? 'Complete'
                          : 'Pending'}
                </span>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="space-y-2 min-w-[200px]">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Progress:</span>
                    <span className="text-sm">{progress}%</span>
                </div>
                {isIndexing && (
                    <>
                        <div className="flex justify-between items-center">
                            <span className="text-sm">Indexed:</span>
                            <span className="text-sm">
                                {indexedCount}/{total}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm">Active:</span>
                            <span className="text-sm">
                                {indexingCount} file
                                {indexingCount !== 1 ? 's' : ''}
                            </span>
                        </div>
                    </>
                )}
                {progress === 100 && (
                    <div className="text-sm text-green-600 dark:text-green-400">
                        All files indexed successfully
                    </div>
                )}
            </TooltipContent>
        </Tooltip>
    );
}
