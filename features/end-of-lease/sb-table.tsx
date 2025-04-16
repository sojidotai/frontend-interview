import { useEffect, useState } from 'react';

import { ChevronRight, Link } from 'lucide-react';
import { useRouter } from 'next/router';

import { cn } from '@/lib/utils';

import { usePagination } from '@/hooks/usePagination';

// Import additional shadcn UI components:
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { useDocuments } from './api';
import { DocumentStatusBadge } from './document-status-badge';
import { LeasingDocument } from './types';

type SBTableProps = {
    projectId: number;
};

const LIMIT = 8;

const SBTable = ({ projectId }: SBTableProps) => {
    const router = useRouter();
    const [totalElements, setTotalElements] = useState(0);
    const { limit, skip, Pagination } = usePagination({
        totalElements,
        limit: LIMIT,
    });
    const { data: documents } = useDocuments({
        type: 'ServiceBulletin',
        projectId,
        limit,
        skip,
    });

    useEffect(() => {
        if (documents) setTotalElements(documents.total);
    }, [documents]);

    const handleClick = (document: LeasingDocument) => {
        router.push(`/lease/documents/${document.id}/page`);
    };

    if (!documents || documents.results.length === 0) {
        return (
            <div className="p-4 text-center text-sm text-muted-foreground">
                No Service Bulletins found.
            </div>
        );
    }

    return (
        <>
            <Table className="w-full mb-2">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-8">Status</TableHead>
                        <TableHead className="w-32">SB</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead className="w-32">Date</TableHead>
                        <TableHead> </TableHead>
                        <TableHead className="w-10"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {documents.results.map((d) => (
                        <TableRow
                            key={d.id}
                            className="cursor-pointer hover:bg-muted transition-colors"
                            onClick={() => handleClick(d)}
                        >
                            <TableCell className="text-right">
                                <DocumentStatusBadge
                                    size="sm"
                                    status={d.status}
                                />
                            </TableCell>
                            <TableCell>{d.raw?.id.value ?? d.id}</TableCell>
                            <TableCell
                                className={cn(
                                    'truncate max-w-64',
                                    !d.seen && 'font-bold',
                                )}
                            >
                                {d.raw?.title.value || 'No Title'}
                            </TableCell>
                            <TableCell>
                                {d.raw?.issueDate.value
                                    ? new Date(
                                          d.raw.issueDate.value,
                                      ).toLocaleDateString()
                                    : ''}
                            </TableCell>
                            <TableCell className="flex flex-row items-center gap-1 justify-end">
                                <Link className="size-4 text-green-600 flex-shrink-0" />
                                {d.connectedDocuments?.length || 0}
                            </TableCell>
                            <TableCell className="text-right">
                                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Pagination />
        </>
    );
};

export default SBTable;
