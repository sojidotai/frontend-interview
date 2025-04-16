/*
 * Arranges a list of children in a grid with the same width but different heights.
 */
import React from 'react';

import { cn, range } from '@/lib/utils';

type BentoGridProps = {
    children: React.ReactNode[];
    cols: number;
    className: string | undefined;
};

export default function BentoGrid({
    children,
    className = undefined,
    cols = 3,
}: BentoGridProps) {
    const columns = range(0, cols).map((n) =>
        children.filter((_, i) => i % cols === n),
    );

    return (
        <div className={cn('grid', `grid-cols-${cols}`, className)}>
            {columns.map((col, i) => (
                <div key={i} className={cn('flex flex-col', className)}>
                    {col}
                </div>
            ))}
        </div>
    );
}
