'use client';

import { useEffect, useState } from 'react';

import { useDeleteDocument, useDocuments } from '@/features/end-of-lease/api';
import { DocumentCard } from '@/features/end-of-lease/document-card';
import { DocumentsTable } from '@/features/end-of-lease/documents-table';
import type { LeasingDocument } from '@/features/end-of-lease/types';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { usePagination } from '@/hooks/usePagination';

import AppHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const LIMIT = 12;

export default function Home() {
    const router = useRouter();
    const projectId = Number(router.query.id as string);

    const [totalElements, setTotalElements] = useState(0);
    const [selectedDocument, setSelectedDocument] =
        useState<LeasingDocument | null>(null);
    const { limit, skip, Pagination } = usePagination({
        totalElements,
        limit: LIMIT,
    });

    const deleteDocument = useDeleteDocument();
    const { data: documents } = useDocuments({ projectId, limit, skip });
    useEffect(() => {
        if (documents) setTotalElements(documents.total);
    }, [documents]);

    return (
        <div className="flex-1 bg-white min-h-full">
            <AppHeader
                links={[
                    { name: 'End of Lease', href: '/' },
                    { name: 'Projects', href: '/leasing/dashboard' },
                    { name: `${projectId}`, href: '#' },
                    { name: 'Documents', href: '#' },
                ]}
            />

            <main className="flex flex-1 overflow-hidden flex-col">
                <div className="flex flex-row w-full justify-end p-8">
                    <Link href={`/lease/projects/${projectId}/upload`}>
                        <Button>Upload new file</Button>
                    </Link>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex flex-row">
                        <div className="flex flex-col flex-1 overflow-hidden">
                            <div className="flex-1 p-8 overflow-auto">
                                <DocumentsTable
                                    documents={documents?.results || []}
                                    onSelectDocument={setSelectedDocument}
                                    onDeleteDocument={async (doc) =>
                                        await deleteDocument.mutateAsync(doc.id)
                                    }
                                    selectedDocumentId={selectedDocument?.id}
                                />
                            </div>
                        </div>

                        {selectedDocument && selectedDocument.raw && (
                            <div className="w-1/4 border-l">
                                <DocumentCard
                                    id={selectedDocument.id}
                                    connectedDocuments={
                                        selectedDocument.connectedDocuments
                                    }
                                    document={selectedDocument.raw}
                                    onClose={() => setSelectedDocument(null)}
                                />
                            </div>
                        )}
                    </div>

                    <Pagination />
                </div>
            </main>
        </div>
    );
}
