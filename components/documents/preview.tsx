import Markdown from 'react-markdown';

import { DocumentStats } from '@/lib/types';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type PreviewProps = {
    document: DocumentStats;
};

export const Preview = ({ document }: PreviewProps) => {
    const normalizeFileSize = (bytes: number) => {
        if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(1)} MB`;
        return `${(bytes / 1e3).toFixed(0)} KB`;
    };

    return (
        <Card className="bg-white rounded-lg">
            <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg font-semibold">
                            {document.sbTitle || document.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            {document.engineModel}
                        </p>
                    </div>
                    <Badge
                        variant={
                            document.state === 'ok' ? 'default' : 'destructive'
                        }
                    >
                        {document.state.toUpperCase()}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Key Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                        <p className="text-muted-foreground">SB Number</p>
                        <p>{document.sbNumber}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">ATA Chapter</p>
                        <p>
                            {document.ataChapter} - {document.ataChapterTitle}
                        </p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Revision</p>
                        <p>{document.revision}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">File Size</p>
                        <p>{normalizeFileSize(document.fileSize)}</p>
                    </div>
                    {document.chapterCount === 0 && (
                        <div className="col-span-full text-red-600 text-sm">
                            ⚠️ Missing chapter content
                        </div>
                    )}
                </div>

                {/* Content Preview */}
                <div className="relative">
                    <div className="max-h-64 overflow-y-scroll text-xs font-mono border b-1 p-2 rounded-xl">
                        <Markdown>{document.content}</Markdown>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent" />
                </div>

                {/* Metadata */}
                <div className="text-sm space-y-2 text-muted-foreground">
                    <div className="flex gap-4 flex-wrap">
                        <div>
                            <span className="font-medium">Updated:</span>
                            <span className="ml-2">
                                {new Date(
                                    document.updatedAt,
                                ).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Transmittal Info */}
                <div className="grid grid-cols-2 gap-4 text-sm border-t pt-4">
                    <div>
                        <p className="text-muted-foreground">Issue Date</p>
                        <p>
                            {document.issueDate &&
                                new Date(
                                    document.issueDate,
                                ).toLocaleDateString()}
                        </p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Latest Revision</p>
                        <p>{document.isLatestRevision ? 'Yes' : 'No'}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
