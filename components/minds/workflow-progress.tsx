import React, { useState } from 'react';

import { Loader2 } from 'lucide-react';

import { Progress } from '@/hooks/useMindsChat';

import { CollapsibleTable } from '@/components/collapsible-table';
import { Progress as ShadProgress } from '@/components/ui/progress';

type ProgressDisplayProps = {
    data: Progress;
};

export function WorkflowProgress({ data }: ProgressDisplayProps) {
    const [isTableVisible, setIsTableVisible] = useState(false);

    if (data.type !== 'Progress') {
        return null;
    }

    const { text, percent, table } = data.value;

    let columns: string[] = [];
    let rows: Array<{ id: string | number; [key: string]: any }> = [];

    if (table?.rows?.length) {
        columns = Object.keys(table.rows[0].cols);
        rows = table.rows.map((row) => ({
            id: row.documentId,
            ...row.cols,
        }));
    }

    return (
        <div className="flex flex-col gap-3 text-sm">
            {text && (
                <div className="text-xs font-medium text-gray-900">{text}</div>
            )}

            {typeof percent === 'number' && (
                <div className="flex flex-col gap-1 w-full max-w-md">
                    <ShadProgress value={percent} className="h-3" />
                    <div className="text-xs text-muted-foreground">
                        {percent.toFixed(2)}% complete
                    </div>
                </div>
            )}

            {table && (
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => setIsTableVisible(!isTableVisible)}
                        className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900 w-fit"
                    >
                        <svg
                            className={`w-4 h-4 transform transition-transform duration-200 ${
                                isTableVisible ? 'rotate-90' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                        {isTableVisible ? 'Hide details' : 'Show details'}
                    </button>

                    {isTableVisible && (
                        <CollapsibleTable
                            columns={columns}
                            rows={rows}
                            previewCount={8}
                            renderCell={(row, column) => {
                                const cellValue = row[column] ?? '';

                                return (
                                    <div>
                                        {cellValue == '<empty>' ? (
                                            <Loader2 className="animate animate-spin w-4 h-4" />
                                        ) : (
                                            String(cellValue)
                                        )}
                                    </div>
                                );
                            }}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
