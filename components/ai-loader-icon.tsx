import { useEffect, useState } from 'react';

import {
    ClipboardList,
    FileText,
    Layers,
    Loader2,
    RefreshCcw,
    Search,
} from 'lucide-react';

import { Progress } from '@/hooks/useMindsChat';

import { CollapsibleTable } from '@/components/collapsible-table';
import { Progress as ShadProgress } from '@/components/ui/progress';

import RotatingIcons from './rotating-icons';

const icons = [
    { component: Search, description: 'Scanning Service Bulletins' },
    { component: FileText, description: 'Loading PDF documents' },
    { component: RefreshCcw, description: 'Verifying information' },
    { component: Layers, description: 'Organizing technical data' },
    {
        component: ClipboardList,
        description: 'Cross-checking compliance details',
    },
];

type AiLoaderIconProps = {
    isHovered?: boolean;
    progress?: Progress | null;
};

export default function AiLoaderIcon({
    isHovered = false,
    progress,
}: AiLoaderIconProps) {
    const [currentIconIndex, setCurrentIconIndex] = useState(0);
    const [isTableVisible, setIsTableVisible] = useState(false);

    let table = progress?.value.table;
    let columns: string[] = [];
    let rows: Array<{ id: string | number; [key: string]: any }> = [];

    if (progress?.value.table?.rows?.length) {
        columns = Object.keys(progress?.value.table.rows[0].cols);
        rows = progress?.value.table.rows.map((row) => ({
            id: row.documentId,
            ...row.cols,
        }));
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIconIndex((current) => (current + 1) % icons.length);
        }, 2400);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col gap-2 items-end">
            {/* Description */}
            <div className="flex flex-row justify-center space-x-4 mr-3 py-2">
                <div className="text-xs font-medium text-gray-900 py-1">
                    {progress?.value.text ||
                        icons[currentIconIndex].description}
                </div>
                <RotatingIcons />
            </div>

            {/* Progress Bar */}
            {typeof progress?.value.percent === 'number' && (
                <div className="flex flex-col gap-1 w-200 max-w-md">
                    <ShadProgress
                        value={progress?.value.percent}
                        className="h-3"
                    />
                    <div className="text-xs text-muted-foreground">
                        {progress?.value.percent.toFixed(2)}% complete
                    </div>
                </div>
            )}

            {/* Table */}
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
