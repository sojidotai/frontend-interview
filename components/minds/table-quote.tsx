import Link from 'next/link';

import { DocumentTable } from '@/lib/types';
import { cn } from '@/lib/utils';

import { useSettings } from '@/hooks/useSettings';

import { CollapsibleTable } from '@/components/collapsible-table';
import { Card, CardContent } from '@/components/ui/card';

type TableQuoteProps = {
    table: DocumentTable;
};

export default function TableQuote({ table }: TableQuoteProps) {
    const { settings } = useSettings();

    // If there's no data
    if (!table || !table.rows || table.rows.length === 0) {
        return <p>No documents found.</p>;
    }

    // Gather column names from the first row of data
    const columns = Object.keys(table.rows[0].cols);
    const adaptedRows = table.rows.map((row) => {
        return {
            id: row.documentId,
            meta: row.meta,
            ...row.cols,
        };
    });

    return (
        <Card
            className={cn(
                'w-full bg-lime-50',
                table.rows.length <= 3 && 'max-w-2xl',
            )}
        >
            <CardContent className="p-6">
                <CollapsibleTable
                    className="max-w-full"
                    columns={columns}
                    rows={adaptedRows}
                    previewCount={8}
                    renderCell={(row, column) => {
                        const rawKey = Object.keys(row).find(
                            (k) => k.toLowerCase() === column.toLowerCase(),
                        );
                        if (rawKey === 'id' || !rawKey) return null;

                        const cellValue = row[rawKey] ?? '';
                        return (
                            <Link
                                href={`/documentDetailView?id=${row.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-lime-950 underline underline-offset-2"
                            >
                                {String(cellValue)}
                            </Link>
                        );
                    }}
                />
            </CardContent>
        </Card>
    );
}
