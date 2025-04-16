import { MultiProgressBar } from '@/components/multi-progress-bar';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { Stats } from './types';

const StatusCard = ({ stats }: { stats: Stats[] }) => {
    const totalDocuments = stats.reduce((sum, stat) => sum + stat.count, 0);
    const verifiedDocuments = stats
        .filter((stat) => ['verified', 'ai_verified'].includes(stat.status))
        .reduce((sum, stat) => sum + stat.count, 0);
    const aiVerifiedDocuments = stats
        .filter((stat) => stat.status == 'ai_verified')
        .reduce((sum, stat) => sum + stat.count, 0);
    const pendingDocuments = stats
        .filter((stat) =>
            ['pending', 'processing_ocr', 'processing_compliance'].includes(
                stat.status,
            ),
        )
        .reduce((sum, stat) => sum + stat.count, 0);
    const errorDocuments = stats
        .filter((stat) => stat.status == 'requires_attention')
        .reduce((sum, stat) => sum + stat.count, 0);

    // Calculate each segment's percentage width.
    const pendingPercent = totalDocuments
        ? (pendingDocuments / totalDocuments) * 100
        : 0;
    const verifiedPercent = totalDocuments
        ? (verifiedDocuments / totalDocuments) * 100
        : 0;
    const requiresAttentionPercent = totalDocuments
        ? (errorDocuments / totalDocuments) * 100
        : 0;
    const overallPercent = verifiedPercent;

    // Build segments for the multi progress bar.
    // Both segments start at 0px from left.
    // Note: The multi progress bar library will show the segments with the given widths
    // overlapping if they are drawn from the same left position.
    const segments = [
        { value: verifiedPercent, color: 'bg-green-400' },
        {
            value: requiresAttentionPercent + verifiedPercent,
            color: 'bg-purple-500',
        },
        {
            value: pendingPercent + requiresAttentionPercent + verifiedPercent,
            color: 'bg-red-400',
        },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Document Status</CardTitle>
                <CardDescription>
                    Overall Document Status Related to Lease Return
                </CardDescription>
            </CardHeader>
            <CardContent className="py-8">
                <div className="flex flex-col items-center gap-2">
                    {/* Main Summary */}
                    <div className="text-3xl font-semibold">
                        {verifiedDocuments} / {totalDocuments} Completed
                    </div>

                    {/* Multi Progress Bar */}
                    {/* The multi progress bar only tracks verified + AI checked documents */}
                    <MultiProgressBar
                        segments={segments}
                        aria-label="Verified and AI Checked Progress"
                    />
                    <div className="text-sm text-muted-foreground">
                        {overallPercent.toFixed(0)}% of documents are either
                        verified or AI checked
                    </div>

                    {/* Detailed Breakdown */}
                    {(pendingDocuments > 0 || errorDocuments > 0) && (
                        <div className="flex justify-around w-full mt-4">
                            {pendingDocuments > 0 && (
                                <div className="text-center">
                                    <div className="text-xl font-semibold">
                                        {pendingDocuments}
                                    </div>
                                    <div className="text-sm">Pending</div>
                                </div>
                            )}
                            {aiVerifiedDocuments > 0 && (
                                <div className="text-center">
                                    <div className="text-xl font-semibold">
                                        {aiVerifiedDocuments}
                                    </div>
                                    <div className="text-sm">AI Checked</div>
                                </div>
                            )}
                            {errorDocuments > 0 && (
                                <div className="text-center">
                                    <div className="text-xl font-semibold">
                                        {errorDocuments}
                                    </div>
                                    <div className="text-sm">
                                        Requires Attention
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default StatusCard;
