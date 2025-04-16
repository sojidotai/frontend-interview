import React from 'react';

import { BarChart2, Bot, MessageSquare, Users } from 'lucide-react';

import { ConversationAnalytics } from '@/lib/dashboard-api';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type ConversationAnalyticsWidgetProps = {
    analytics: ConversationAnalytics[];
};

const ConversationAnalyticsWidget = ({
    analytics,
}: ConversationAnalyticsWidgetProps) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex flex-row justify-between items-center">
                    Conversation Analytics
                    <MessageSquare className="w-6 h-6 text-blue-500" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                {analytics.map((entry, index) => (
                    <div
                        key={entry.chatDate}
                        className={`
                            p-4 rounded-lg bg-gradient-to-r from-gray-50 to-white
                            border border-gray-100
                            ${index > 0 ? 'mt-4' : ''}
                        `}
                    >
                        <h3 className="text-lg font-semibold text-gray-900">
                            {formatDate(entry.chatDate)}
                        </h3>

                        <div className="mt-3 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 text-sm flex items-center gap-1">
                                    <MessageSquare className="w-4 h-4" />
                                    Total Conversations
                                </span>
                                <span className="font-medium text-gray-900">
                                    {entry.totalConversations.toLocaleString()}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 text-sm flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    User Messages
                                </span>
                                <span className="font-medium text-gray-900">
                                    {entry.userMessages.toLocaleString()}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 text-sm flex items-center gap-1">
                                    <Bot className="w-4 h-4" />
                                    Assistant Responses
                                </span>
                                <span className="font-medium text-gray-900">
                                    {entry.assistantResponses.toLocaleString()}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 text-sm flex items-center gap-1">
                                    <BarChart2 className="w-4 h-4" />
                                    Avg Message Length
                                </span>
                                <span className="font-medium text-gray-900">
                                    {Math.round(entry.avgMessageLength)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default ConversationAnalyticsWidget;
