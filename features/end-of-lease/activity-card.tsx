import { Bot, PencilLine, RefreshCw, UploadCloud } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useActivities } from './api';
import { Activity } from './types';

type ActivityCardProps = {
    projectId: number;
};

const ActivityCard = ({ projectId }: ActivityCardProps) => {
    const { data: activities, isLoading } = useActivities(projectId);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    /**
     * Map activity types to corresponding Lucide icons.
     */
    const getIconForType = (type: Activity['type']) => {
        switch (type) {
            case 'upload':
                return <UploadCloud className="h-5 w-5" />;
            case 'status_change':
                return <PencilLine className="h-5 w-5" />;
            case 'ai_check':
                return <Bot className="h-5 w-5" />;
            default:
                return null;
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Activity Tracker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {activities && activities.length > 0 ? (
                    activities.map((activity: Activity, index: number) => {
                        // Extract initials for non-ai activities.
                        const initials =
                            activity.username
                                .split(' ')
                                .map((name) => name.charAt(0))
                                .join('')
                                .slice(0, 2) || '';

                        return (
                            <div
                                key={index}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback
                                            className={cn(
                                                activity.type === 'ai_check' &&
                                                    'bg-purple-500',
                                            )}
                                        >
                                            {activity.type === 'ai_check' ? (
                                                <Bot className="h-4 w-4 text-white" />
                                            ) : (
                                                initials
                                            )}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">
                                            {activity.username}
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="text-sm">
                                                {activity.title}
                                            </div>
                                            {activity.description && (
                                                <div className="text-xs text-zinc-600">
                                                    {activity.description}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    {getIconForType(activity.type)}
                                    <div className="text-xs text-muted-foreground">
                                        {new Date(
                                            activity.createdAt,
                                        ).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>No activities found.</p>
                )}
            </CardContent>
        </Card>
    );
};

export default ActivityCard;
