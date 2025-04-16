import React from 'react';

import { AlertCircle, Clock, Wrench } from 'lucide-react';

import { RecentSB } from '@/lib/dashboard-api';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type RecentSBsWidgetsProps = {
    recentSbs: RecentSB[];
};

const RecentSBsWidget = ({ recentSbs }: RecentSBsWidgetsProps) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex flex-row justify-between items-center">
                    Service Bulletins
                    <Wrench className="w-6 h-6 text-blue-500" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                {recentSbs.map((engine, index) => (
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
                                <span className="text-gray-600 text-sm">
                                    Total SBs
                                </span>
                                <span className="font-medium text-gray-900">
                                    {engine.sbCount}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 text-sm flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    Latest Update
                                </span>
                                <span className="font-medium text-gray-900">
                                    {formatDate(engine.latestSb)}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 text-sm flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    Recent (30 days)
                                </span>
                                <span className="font-medium text-gray-900">
                                    {engine.recentSbs}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default RecentSBsWidget;
