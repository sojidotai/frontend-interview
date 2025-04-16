import * as React from 'react';

import { cn } from '@/lib/utils';

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface CircularProgressProps extends React.SVGProps<SVGSVGElement> {
    value: number;
    size?: number;
    strokeWidth?: number;
}

export const CircularProgress = React.forwardRef<
    SVGSVGElement,
    CircularProgressProps
>(({ value, size = 40, strokeWidth = 8, className, ...props }, ref) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (value / 100) * circumference;
    const color = value == 100 ? 'text-green-600' : 'text-primary';

    return (
        <svg
            className={cn('transform -rotate-90', className)}
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            ref={ref}
            {...props}
        >
            <circle
                className="text-gray-200 dark:text-gray-700"
                strokeWidth={strokeWidth}
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx={size / 2}
                cy={size / 2}
            />
            <circle
                className={cn('transition-all duration-300 ease-in-out', color)}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx={size / 2}
                cy={size / 2}
            />
        </svg>
    );
});
CircularProgress.displayName = 'CircularProgress';
