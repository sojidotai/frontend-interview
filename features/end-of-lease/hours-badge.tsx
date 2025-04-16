'use client';

import { useEffect, useState } from 'react';

import { ArrowDownIcon, ArrowUpIcon, ClockIcon, MinusIcon } from 'lucide-react';

interface HoursBadgeProps {
    actualHours?: number;
    estimatedHours?: number;
    showValues?: boolean;
    className?: string;
}

export default function HoursBadge({
    actualHours,
    estimatedHours,
    showValues = true,
    className = '',
}: HoursBadgeProps) {
    const [difference, setDifference] = useState<number | null>(null);
    const [status, setStatus] = useState<
        'over' | 'under' | 'equal' | 'unknown' | 'estimated'
    >('unknown');

    useEffect(() => {
        if (actualHours !== undefined && estimatedHours !== undefined) {
            const diff = actualHours - estimatedHours;
            setDifference(diff);

            if (diff > 0) {
                setStatus('over');
            } else if (diff < 0) {
                setStatus('under');
            } else {
                setStatus('equal');
            }
        } else if (estimatedHours !== undefined) {
            setStatus('estimated');
            setDifference(null);
        } else {
            setStatus('unknown');
            setDifference(null);
        }
    }, [actualHours, estimatedHours]);

    const getStatusColor = () => {
        switch (status) {
            case 'over':
                return 'bg-red-50 text-red-700 border-red-200';
            case 'under':
                return 'bg-green-50 text-green-700 border-green-200';
            case 'equal':
                return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'estimated':
                return 'bg-amber-50 text-amber-700 border-amber-200';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    const getStatusIcon = () => {
        switch (status) {
            case 'over':
                return <ArrowUpIcon className="w-3.5 h-3.5" />;
            case 'under':
                return <ArrowDownIcon className="w-3.5 h-3.5" />;
            case 'equal':
                return <MinusIcon className="w-3.5 h-3.5" />;
            case 'estimated':
                return <ClockIcon className="w-3.5 h-3.5" />;
            default:
                return <ClockIcon className="w-3.5 h-3.5" />;
        }
    };

    const formatHours = (hours: number) => {
        return hours.toFixed(1);
    };

    const getStatusText = () => {
        if (status === 'estimated' && estimatedHours !== undefined) {
            return `Est. ${formatHours(estimatedHours)}h`;
        }

        if (difference === null) return 'No data';

        const absValue = Math.abs(difference);
        const formattedDiff = formatHours(absValue);

        switch (status) {
            case 'over':
                return `+${formattedDiff}h`;
            case 'under':
                return `-${formattedDiff}h`;
            case 'equal':
                return 'On target';
            default:
                return 'Unknown';
        }
    };

    return (
        <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${getStatusColor()} ${className}`}
        >
            {getStatusIcon()}
            <span>{getStatusText()}</span>
            {showValues &&
                actualHours !== undefined &&
                estimatedHours !== undefined && (
                    <span className="text-[10px] opacity-80">
                        ({formatHours(actualHours)}h /{' '}
                        {formatHours(estimatedHours)}h)
                    </span>
                )}
        </div>
    );
}
