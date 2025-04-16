import { Clock, Users } from 'lucide-react';

import { JobQueueStats } from '@/lib/types';
import { cn } from '@/lib/utils';

import JobQueueTask from './job-queue-task';

type BackgroundJobQueueProps = {
    stats: JobQueueStats;
};

export default function BackgroundJobQueue({ stats }: BackgroundJobQueueProps) {
    const { summary, jobTypeStats } = stats;

    const pickedPercentage =
        summary.totalJobs > 0
            ? Math.round(
                  (summary.statusCounts.picked / summary.totalJobs) * 100,
              )
            : 0;

    return (
        <div className="container mx-auto p-2 sm:p-6 space-y-2 sm:space-y-6 max-w-[1024px]">
            {/* Summary Section */}
            <div className="flex justify-between items-start p-4 bg-white rounded-2xl">
                <div className="text-center">
                    <span className="text-sm text-muted-foreground">
                        Picked Jobs
                    </span>
                    <div className="text-2xl font-bold">
                        {summary.statusCounts.picked}
                    </div>
                    <div className="text-xs text-gray-500">
                        {pickedPercentage}% of total jobs
                    </div>
                </div>
                <div className="text-center">
                    <span className="text-sm text-muted-foreground">
                        Total Jobs
                    </span>
                    <div className="text-2xl font-bold">
                        {summary.totalJobs}
                    </div>
                </div>
                <div className="text-center">
                    <span className="text-sm text-muted-foreground">
                        Unique Job Types
                    </span>
                    <div className="text-2xl font-bold">
                        {summary.uniqueJobTypes}
                    </div>
                </div>
            </div>

            {/* Job Types Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                {Object.entries(jobTypeStats).map(([jobType, stats]) => (
                    <div
                        key={jobType}
                        className={cn(
                            'flex items-center justify-between p-3 rounded',
                            stats.statusBreakdown['picked'] > 0
                                ? 'bg-white'
                                : 'bg-zinc-100',
                        )}
                    >
                        {/* Job Type Info */}
                        <div className="flex flex-col gap-1">
                            <JobQueueTask
                                jobName={jobType}
                                isRunning={stats.statusBreakdown['picked'] > 0}
                            />
                        </div>

                        {/* Job Type Stats */}
                        <div className="flex flex-col gap-1 items-end">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                    <Users className="w-4 h-4 text-muted-foreground mr-1" />
                                    <span className="text-sm">
                                        {stats.uniqueCustomers}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 text-muted-foreground mr-1" />
                                    <span className="text-sm">
                                        {stats.avgProcessingTime.toFixed(1)}s
                                    </span>
                                </div>
                            </div>

                            <div className="text-xs text-gray-500">
                                <span className="text-primary font-medium">
                                    {stats.count} Jobs
                                </span>{' '}
                                • {stats.uniqueCustomers} Customers
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
