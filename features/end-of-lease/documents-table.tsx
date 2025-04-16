'use client';

import { useState } from 'react';

import type { LeasingDocument } from '@/features/end-of-lease/types';
import { ChevronDown, Filter, Search, Trash2 } from 'lucide-react';

import { formatDate } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface DocumentsTableProps {
    documents: LeasingDocument[];
    onSelectDocument: (document: LeasingDocument) => void;
    selectedDocumentId?: number;
    onDeleteDocument?: (document: LeasingDocument) => void;
}

export function DocumentsTable({
    documents,
    onSelectDocument,
    selectedDocumentId,
    onDeleteDocument,
}: DocumentsTableProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState<string | null>(null);

    const filteredDocuments = documents.filter((doc) => {
        const matchesSearch =
            searchTerm === '' ||
            doc.raw?.id.value
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            doc.raw?.title.value
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesType = typeFilter === null || doc.raw?.type === typeFilter;

        return matchesSearch && matchesType;
    });

    const documentTypes = Array.from(
        new Set(documents.map((doc) => doc.raw?.type)),
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 w-1/3">
                    <div className="relative w-full">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            placeholder="Search documents..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="flex items-center gap-1"
                        >
                            <Filter className="h-4 w-4" />
                            Filter by Type
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTypeFilter(null)}>
                            All Types
                        </DropdownMenuItem>
                        {documentTypes.map((type) => (
                            <DropdownMenuItem
                                key={type}
                                onClick={() =>
                                    setTypeFilter(type || 'ServiceBulletin')
                                }
                            >
                                {type}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="border rounded-md">
                <Table className="text-sm">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/4">Document</TableHead>
                            <TableHead className="w-2/5">Details</TableHead>
                            <TableHead>Aircraft & Authority</TableHead>
                            <TableHead className="w-16"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredDocuments.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={3}
                                    className="text-center py-8 text-gray-500"
                                >
                                    No documents found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredDocuments.map((document) => (
                                <TableRow
                                    key={document.id}
                                    className={`cursor-pointer hover:bg-gray-50 ${
                                        selectedDocumentId === document.id
                                            ? 'bg-blue-50'
                                            : ''
                                    }`}
                                    onClick={() => onSelectDocument(document)}
                                >
                                    <TableCell className="py-2">
                                        <div className="flex flex-col">
                                            <Badge className="w-fit font-normal text-xs mb-1">
                                                {document.raw?.type ||
                                                    'Processing'}
                                            </Badge>
                                            <div className="text-xs text-gray-500 ml-1">
                                                {formatDate(
                                                    document.raw?.issueDate
                                                        ?.value,
                                                )}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-2">
                                        <div className="flex flex-col">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="font-medium truncate w-64">
                                                        {document.raw?.title
                                                            ?.value ||
                                                            'Untitled'}
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    {document.raw?.title
                                                        ?.value || 'Untitled'}
                                                </TooltipContent>
                                                <div className="text-xs">
                                                    {document.raw?.id.value}
                                                </div>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-2">
                                        <div className="flex flex-col text-sm">
                                            <div>
                                                {document.raw?.aircraft?.type
                                                    ?.value || '-'}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {document.raw?.issuingAuthority
                                                    ?.value || '-'}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            onClick={() =>
                                                onDeleteDocument &&
                                                onDeleteDocument(document)
                                            }
                                        >
                                            <Trash2 className="h-5 w-5 text-amber-600 hover:scale-105 transition-all" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
