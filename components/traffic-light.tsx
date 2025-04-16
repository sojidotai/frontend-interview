'use client';

import { cn } from '@/lib/utils';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

type Status = 'critical' | 'warning' | 'success';

interface TrafficLightProps {
    status: Status;
    label?: string;
    showLabel?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export default function TrafficLight({
    status,
    label,
    showLabel = false,
    size = 'md',
    className = '',
}: TrafficLightProps) {
    const statusConfig = {
        critical: {
            label: label || 'Critical',
            description: 'Project is facing critical issues',
        },
        warning: {
            label: label || 'Warning',
            description: 'Project has some issues that need attention',
        },
        success: {
            label: label || 'On Track',
            description: 'Project is proceeding as planned',
        },
    };

    const config = statusConfig[status];

    const sizeConfig = {
        sm: {
            container: 'w-4 h-10',
            light: 'w-2.5 h-2.5',
            text: 'text-xs',
            gap: 'gap-1',
        },
        md: {
            container: 'w-6 h-16',
            light: 'w-4 h-4',
            text: 'text-sm',
            gap: 'gap-1.5',
        },
        lg: {
            container: 'w-8 h-20',
            light: 'w-5 h-5',
            text: 'text-base',
            gap: 'gap-2',
        },
    };

    const sizeClasses = sizeConfig[size];

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div
                        className={cn(
                            'inline-flex items-center',
                            sizeClasses.gap,
                            className,
                        )}
                    >
                        <div
                            className={cn(
                                'relative flex flex-col items-center justify-between py-1.5 rounded bg-zinc-700 border border-gray-700',
                                sizeClasses.container,
                            )}
                        >
                            {/* Red light */}
                            <div
                                className={cn(
                                    'rounded-full border border-red-900/30',
                                    sizeClasses.light,
                                    status === 'critical'
                                        ? 'bg-red-500 shadow-[0_0_12px_4px_rgba(239,68,68,0.7)]'
                                        : 'bg-red-900/70',
                                )}
                            />

                            {/* Yellow light */}
                            <div
                                className={cn(
                                    'rounded-full border border-amber-900/30',
                                    sizeClasses.light,
                                    status === 'warning'
                                        ? 'bg-amber-400 shadow-[0_0_12px_4px_rgba(251,191,36,0.7)]'
                                        : 'bg-amber-700/70',
                                )}
                            />

                            {/* Green light */}
                            <div
                                className={cn(
                                    'rounded-full border border-green-900/30',
                                    sizeClasses.light,
                                    status === 'success'
                                        ? 'bg-green-300 shadow-[0_0_12px_4px_rgba(34,197,94,0.7)]'
                                        : 'bg-green-800/70',
                                )}
                            />
                        </div>

                        {showLabel && (
                            <span
                                className={cn('font-medium', sizeClasses.text)}
                            >
                                {config.label}
                            </span>
                        )}
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{config.description}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
