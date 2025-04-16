import * as React from 'react';

import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

export type ProgressSegment = {
    value: number; // Percentage value (0 to 100)
    color?: string;
};

export type MultiProgressBarProps = React.ComponentPropsWithoutRef<
    typeof ProgressPrimitive.Root
> & {
    segments: ProgressSegment[];
};

const MultiProgressBar = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    MultiProgressBarProps
>(({ className, segments, ...props }, ref) => {
    return (
        <ProgressPrimitive.Root
            ref={ref}
            className={cn(
                'relative h-2 w-full overflow-hidden rounded bg-slate-200',
                className,
            )}
            {...props}
        >
            {segments.map((segment, index) => (
                <ProgressPrimitive.Indicator
                    key={index}
                    className={cn(
                        'h-full transition-all absolute top-0',
                        segment.color ? segment.color : 'bg-primary',
                    )}
                    style={{
                        width: `${segment.value}%`,
                        left: '0%',
                        zIndex: segments.length - index,
                    }}
                />
            ))}
        </ProgressPrimitive.Root>
    );
});

MultiProgressBar.displayName = 'MultiProgressBar';

export { MultiProgressBar };
