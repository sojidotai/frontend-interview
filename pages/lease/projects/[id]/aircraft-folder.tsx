'use client';

import { useEffect, useState } from 'react';

import { useDeleteDocument, useDocuments } from '@/features/end-of-lease/api';
import { DocumentCard } from '@/features/end-of-lease/document-card';
import { DocumentsExplorer } from '@/features/end-of-lease/documents-explorer';
import type { LeasingDocument } from '@/features/end-of-lease/types';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

import { usePagination } from '@/hooks/usePagination';

import AppHeader from '@/components/page-header';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const LIMIT = 4 * 5;

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

    const unmatchedEOs = useDocuments({
        projectId,
        type: 'EngineeringOrder',
        matched: false,
        limit: 10,
        skip: 0,
    });

    const deleteDocument = useDeleteDocument();
    const { data: documents } = useDocuments({
        type: 'ServiceBulletin',
        projectId,
        limit,
        skip,
    });

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
                    { name: 'Aircraft Folder', href: '#' },
                ]}
            />

            <div className="flex flex-col items-center w-full pt-16">
                <h3 className="font-bold text-xl">Aircraft Folder</h3>
                <div className="max-w-xl text-zinc-500 text-sm">
                    The aircraft folder is a comprehensive collection of all
                    essential documents detailing an aircraft’s history,
                    maintenance, modifications, and compliance records. It
                    ensures a smooth end-of-lease transition by proving the
                    aircraft’s airworthiness, regulatory compliance, and asset
                    value.
                </div>
            </div>

            <main className="flex flex-1 overflow-hidden flex-col">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row">
                        <div className="flex flex-col flex-1">
                            <div className="flex-1 flex-col p-8 gap-8">
                                <DocumentsExplorer
                                    documents={documents?.results || []}
                                    onSelectDocument={setSelectedDocument}
                                    onDeleteDocument={async (doc) =>
                                        await deleteDocument.mutateAsync(doc.id)
                                    }
                                    selectedDocumentId={selectedDocument?.id}
                                />

                                <div className="pt-8">
                                    <Pagination />
                                </div>
                            </div>
                        </div>

                        <AnimatePresence>
                            {selectedDocument && selectedDocument.raw && (
                                <motion.div
                                    className="w-1/4 border-l"
                                    initial={{ x: '100%', opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: '100%', opacity: 0 }}
                                    transition={{
                                        type: 'tween',
                                        ease: 'easeOut',
                                        duration: 0.2,
                                    }}
                                >
                                    <DocumentCard
                                        id={selectedDocument.fileId}
                                        connectedDocuments={
                                            selectedDocument.connectedDocuments
                                        }
                                        document={selectedDocument.raw}
                                        onClose={() =>
                                            setSelectedDocument(null)
                                        }
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </main>
        </div>
    );
}
