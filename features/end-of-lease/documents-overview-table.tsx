import { ChevronRight } from 'lucide-react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { DocumentStatusBadge } from './document-status-badge';
import { DocumentStatus } from './types';

export type AviationDocument = {
    id: string | number;
    status: DocumentStatus;
    title: string;
    issueDate?: string; // ISO string or any valid date string
};

type DocumentsOverviewTableProps = {
    documents: AviationDocument[];
};

const DocumentsOverviewTable = ({ documents }: DocumentsOverviewTableProps) => {
    if (!documents || documents.length === 0) {
        return (
            <div className="p-4 text-center text-sm text-muted-foreground">
                No Documents found.
            </div>
        );
    }

    return (
        <>
            <Table className="w-full mb-2">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-10">Status</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead className="w-32">Date</TableHead>
                        <TableHead className="w-10" />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {documents.map((doc) => (
                        <TableRow
                            key={doc.id}
                            className="hover:bg-muted transition-colors"
                        >
                            <TableCell className="text-right">
                                <DocumentStatusBadge
                                    size="sm"
                                    status={doc.status}
                                />
                            </TableCell>
                            <TableCell className="truncate max-w-xl">
                                {doc.title || 'No Title'}
                            </TableCell>
                            <TableCell>
                                {doc.issueDate
                                    ? new Date(
                                          doc.issueDate,
                                      ).toLocaleDateString()
                                    : ''}
                            </TableCell>
                            <TableCell className="text-right">
                                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default DocumentsOverviewTable;
