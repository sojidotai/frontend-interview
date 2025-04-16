import React, { useState } from 'react';

import { ChevronDown, ChevronUp } from 'lucide-react';

import { formatCamelCase } from '@/lib/humanize';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export interface CollapsibleTableRow {
    id: string | number;
    [key: string]: any;
}

export type CollapsibleTableProps = {
    columns: string[];
    rows: CollapsibleTableRow[];
    previewCount?: number;
    className?: string;

    /**
     * Custom cell renderer.
     * If not provided, it defaults to row[column] as text.
     */
    renderCell?: (
        row: CollapsibleTableRow,
        column: string,
        rowIndex: number,
    ) => React.ReactNode;
};

/**
 * CollapsibleTable: shows a table of data, and allows the user to expand or
 * collapse the rows beyond a given preview count.
 */
export function CollapsibleTable({
    columns,
    rows,
    previewCount = 8,
    className,
    renderCell,
}: CollapsibleTableProps) {
    // If the total rows is less than previewCount,
    // we start expanded by default.
    const [expanded, setExpanded] = useState(rows.length < previewCount);
    const [isAnimating, setIsAnimating] = useState(false);

    const visibleRows = expanded ? rows : rows.slice(0, previewCount);

    const handleExpand = () => {
        setIsAnimating(true);
        setExpanded(true);
    };

    const handleCollapse = () => {
        setIsAnimating(true);
        setExpanded(false);
    };

    if (!rows || rows.length === 0) {
        return <p>No data found.</p>;
    }

    return (
        <div className={cn('w-full overflow-hidden', className)}>
            <div
                className={`transition-all duration-500 ease-in-out ${
                    isAnimating ? 'animate-height' : ''
                }`}
                onTransitionEnd={() => setIsAnimating(false)}
            >
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((col) =>
                                col === 'confidence' ? null : (
                                    <TableHead key={col} className="p-2">
                                        {formatCamelCase(col)}
                                    </TableHead>
                                ),
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {visibleRows.map((row, rowIndex) => (
                            <TableRow
                                key={row.id}
                                className={cn(
                                    'hover:bg-lime-100 transition-all duration-300',
                                    {
                                        'bg-red-100': row.confidence <= 25,
                                        'bg-orange-100':
                                            row.confidence > 25 &&
                                            row.confidence <= 50,
                                        'bg-blue-100':
                                            row.confidence > 50 &&
                                            row.confidence <= 85,
                                        'bg-green-100': row.confidence > 85,
                                    },
                                )}
                            >
                                {columns.map((col) =>
                                    col === 'confidence' ? null : (
                                        <TableCell
                                            key={`${row.id}-${col}`}
                                            className="text-xs p-3 align-top"
                                        >
                                            {renderCell
                                                ? renderCell(row, col, rowIndex)
                                                : String(row[col] ?? '')}
                                        </TableCell>
                                    ),
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Expand/Collapse Controls */}
            {expanded ? (
                <div className="mt-2 w-full flex justify-center">
                    <Button size="sm" variant="ghost" onClick={handleCollapse}>
                        <ChevronUp />
                    </Button>
                </div>
            ) : (
                <div className="mt-2 w-full flex flex-col gap-2 items-start">
                    {rows.length > previewCount && (
                        <div className="text-xs">
                            And {rows.length - previewCount} more rows
                        </div>
                    )}
                    <div className="w-full flex justify-center">
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleExpand}
                        >
                            <ChevronDown />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
