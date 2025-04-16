import React from 'react';

import { AlertCircle, FileText, History } from 'lucide-react';

import { RevisionStat } from '@/lib/dashboard-api';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type RevisionStatsWidgetProps = {
    revisionStats: RevisionStat[];
};

const RevisionStatsWidget = ({ revisionStats }: RevisionStatsWidgetProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex flex-row justify-between items-center">
                    Revision Statistics
                    <History className="w-6 h-6 text-blue-500" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                {revisionStats.map((engine, index) => (
                    <div
                        key={engine.engineModel}
                        className={`
                            p-4 rounded-lg bg-gradient-to-r from-gray-50 to-white
                            border border-gray-100
                            ${index > 0 ? 'mt-4' : ''}
                        `}
                    >
                        <h3 className="text-lg font-semibold text-gray-900">
                            {engine.engineModel}
                        </h3>

                        <div className="mt-3 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 text-sm flex items-center gap-1">
                                    <FileText className="w-4 h-4" />
                                    Total Documents
                                </span>
                                <span className="font-medium text-gray-900">
                                    {engine.totalDocs}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 text-sm flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    Frequently Updated
                                </span>
                                <span className="font-medium text-gray-900">
                                    {engine.frequentlyUpdatedDocs}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default RevisionStatsWidget;
