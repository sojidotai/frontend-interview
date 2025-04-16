'use client';

import { CheckCircle2, Clock, FileText, Link2 } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import { DocumentStatus, LeasingDocument } from './types';

interface DocumentProcessingPopupProps {
    document: LeasingDocument;
}

export default function DocumentProcessingCard({
    document,
}: DocumentProcessingPopupProps) {
    // Determine if connections are established based on status
    const isConnected = document.status === 'ai_verified';

    // Calculate progress percentage based on status
    const getProgressValue = (status: DocumentStatus): number => {
        switch (status) {
            case 'pending':
                return 25;
            case 'processing_ocr':
                return 50;
            case 'processing_compliance':
                return 75;
            case 'ai_verified':
                return 100;
            case 'requires_attention':
                return 100;
            case 'verified':
                return 100;
            default:
                return 0;
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Processing PDF File</CardTitle>
                <TrafficLight status={isConnected ? 'green' : 'yellow'} />
            </CardHeader>

            <CardContent>
                <div className="mb-6">
                    <Progress
                        value={getProgressValue(document.status)}
                        className="h-2 mb-2"
                    />
                    <StatusIndicator currentStatus={document.status} />
                </div>

                {document.raw?.type === 'ServiceBulletin' && (
                    <>
                        <div className="mt-8">
                            <h4 className="text-sm font-medium text-gray-500 mb-3">
                                Document Connections
                            </h4>
                            {document.raw?.id.value && (
                                <DocumentConnectionVisualizer
                                    connected={isConnected}
                                    documentNumber={document.raw?.id.value}
                                />
                            )}
                        </div>

                        <div className="mt-4 text-xs text-gray-500">
                            <p>Document ID: {document.id}</p>
                            <p>
                                Last Updated:{' '}
                                {new Date(document.updatedAt).toLocaleString()}
                            </p>
                        </div>
                    </>
                )}
                {document.raw?.type !== 'ServiceBulletin' &&
                    document.raw?.type !== undefined && (
                        <>
                            <div className="mt-8">
                                <h4 className="text-sm font-medium text-gray-500 mb-3">
                                    {document.raw?.type}
                                </h4>
                            </div>

                            <div className="mt-4 text-xs text-gray-500">
                                <p>Document ID: {document.id}</p>
                                <p>
                                    Last Updated:{' '}
                                    {new Date(
                                        document.updatedAt,
                                    ).toLocaleString()}
                                </p>
                            </div>
                        </>
                    )}
            </CardContent>
        </Card>
    );
}

function StatusIndicator({ currentStatus }: { currentStatus: DocumentStatus }) {
    const statuses = [
        { id: 'pending', label: 'Pending' },
        { id: 'processing_ocr', label: 'OCR' },
        { id: 'processing_compliance', label: 'Compliance Checks' },
        { id: 'ai_verified', label: 'AI Complete' },
    ];

    return (
        <div className="flex justify-between text-xs">
            {statuses.map((status) => (
                <div
                    key={status.id}
                    className={`flex flex-col items-center ${
                        currentStatus === status.id
                            ? 'text-blue-600 font-medium'
                            : statuses.findIndex(
                                    (s) => s.id === currentStatus,
                                ) >
                                statuses.findIndex((s) => s.id === status.id)
                              ? 'text-green-600'
                              : 'text-gray-400'
                    }`}
                >
                    <span className="mb-1">{status.label}</span>
                    {currentStatus === status.id ? (
                        <Clock className="h-4 w-4" />
                    ) : statuses.findIndex((s) => s.id === currentStatus) >
                      statuses.findIndex((s) => s.id === status.id) ? (
                        <CheckCircle2 className="h-4 w-4" />
                    ) : (
                        <div className="h-4 w-4 rounded-full border border-gray-300" />
                    )}
                </div>
            ))}
        </div>
    );
}

function TrafficLight({ status }: { status: 'red' | 'yellow' | 'green' }) {
    return (
        <div className="flex items-center space-x-1.5">
            <div
                className={`w-3.5 h-3.5 rounded-full ${status === 'red' ? 'bg-red-500' : 'bg-gray-200'}`}
            />
            <div
                className={`w-3.5 h-3.5 rounded-full ${status === 'yellow' ? 'bg-yellow-400' : 'bg-gray-200'}`}
            />
            <div
                className={`w-3.5 h-3.5 rounded-full ${status === 'green' ? 'bg-green-500' : 'bg-gray-200'}`}
            />
        </div>
    );
}

function DocumentConnectionVisualizer({
    connected,
    documentNumber,
}: {
    connected: boolean;
    documentNumber: string;
}) {
    return (
        <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <FileText className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="text-sm font-medium">
                            Service Bulletin {documentNumber}
                        </span>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                        Primary
                    </span>
                </div>

                <div className="flex justify-center">
                    <div className="h-[30px]">
                        <Link2
                            className={`h-5 w-5 mx-auto ${connected ? 'text-green-600' : 'text-yellow-500'}`}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div
                        className={`p-3 rounded-lg border ${connected ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}
                    >
                        <div className="flex items-center">
                            <FileText
                                className={`h-4 w-4 mr-2 ${connected ? 'text-green-600' : 'text-gray-400'}`}
                            />
                            <span className="text-xs font-medium">
                                Work Order
                            </span>
                        </div>
                        <div className="mt-2 text-xs">
                            <span
                                className={`${connected ? 'text-green-800' : 'text-gray-500'}`}
                            >
                                WO-2023-1138
                            </span>
                            {connected && (
                                <span className="ml-2 text-green-600">
                                    ✓ Signed
                                </span>
                            )}
                        </div>
                    </div>

                    <div
                        className={`p-3 rounded-lg border ${connected ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}
                    >
                        <div className="flex items-center">
                            <FileText
                                className={`h-4 w-4 mr-2 ${connected ? 'text-green-600' : 'text-gray-400'}`}
                            />
                            <span className="text-xs font-medium">
                                Engineering Order
                            </span>
                        </div>
                        <div className="mt-2 text-xs">
                            <span
                                className={`${connected ? 'text-green-800' : 'text-gray-500'}`}
                            >
                                EO-2023-0587
                            </span>
                            {connected && (
                                <span className="ml-2 text-green-600">
                                    ✓ Signed
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
