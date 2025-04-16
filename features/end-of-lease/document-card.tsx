'use client';

import {
    type AviationDocument,
    ConnectedDocument,
    isAirworthinessDirective,
    isEngineeringOrder,
    isServiceBulletin,
    isTaskCard,
    isWorkOrder,
} from '@/features/end-of-lease/types';
import { X } from 'lucide-react';

import { formatDate } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { usePreview } from './api';

interface DocumentCardProps {
    document: AviationDocument;
    connectedDocuments: ConnectedDocument[] | null;
    id: number;
    onClose: () => void;
}

export function DocumentCard({
    document,
    connectedDocuments,
    id,
    onClose,
}: DocumentCardProps) {
    const { data: preview } = usePreview(id);

    return (
        <div className="h-full flex flex-col shadow-none">
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-2">
                    <h2 className="text-lg font-semibold">
                        {document.id.value}
                    </h2>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-4 w-4" />
                </Button>
            </div>
            <div className="flex-1 overflow-auto p-4">
                <Tabs defaultValue="details">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="references">References</TabsTrigger>
                        <TabsTrigger value="approvals">Approvals</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details" className="space-y-4 pt-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">
                                    <div className="flex flex-row align-center justify-between">
                                        Basic Information
                                        {preview && (
                                            <Button variant="outline">
                                                <a
                                                    href={preview}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Open PDF
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            Title
                                        </p>
                                        <p className="text-sm">
                                            {document.title?.value ||
                                                'Untitled'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            Issue Date
                                        </p>
                                        <p className="text-sm">
                                            {formatDate(
                                                document.issueDate?.value,
                                            )}
                                        </p>
                                    </div>
                                    {document.effectiveDate && (
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">
                                                Effective Date
                                            </p>
                                            <p className="text-sm">
                                                {formatDate(
                                                    document.effectiveDate
                                                        .value,
                                                )}
                                            </p>
                                        </div>
                                    )}
                                    {document.expiryDate && (
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">
                                                Expiry Date
                                            </p>
                                            <p className="text-sm">
                                                {formatDate(
                                                    document.expiryDate.value,
                                                )}
                                            </p>
                                        </div>
                                    )}
                                    {document.issuingAuthority && (
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">
                                                Issuing Authority
                                            </p>
                                            <p className="text-sm">
                                                {
                                                    document.issuingAuthority
                                                        .value
                                                }
                                            </p>
                                        </div>
                                    )}
                                    {document.priority && (
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">
                                                Priority
                                            </p>
                                            <p className="text-sm capitalize">
                                                {document.priority.value}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {document.aircraft && (
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base">
                                        Aircraft Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">
                                                Type
                                            </p>
                                            <p className="text-sm">
                                                {document.aircraft.type?.value}
                                            </p>
                                        </div>
                                        {document.aircraft.registration && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">
                                                    Registration
                                                </p>
                                                <p className="text-sm">
                                                    {
                                                        document.aircraft
                                                            .registration.value
                                                    }
                                                </p>
                                            </div>
                                        )}
                                        {document.aircraft.serialNumber && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">
                                                    Serial Number
                                                </p>
                                                <p className="text-sm">
                                                    {
                                                        document.aircraft
                                                            .serialNumber.value
                                                    }
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {renderTypeSpecificContent(document)}
                    </TabsContent>

                    <TabsContent value="references" className="pt-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">
                                    References
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {document.references &&
                                document.references.length > 0 ? (
                                    <ul className="space-y-2">
                                        {document.references.map(
                                            (ref, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start space-x-2"
                                                >
                                                    <Badge className="mt-0.5">
                                                        {ref.referenceType}
                                                    </Badge>
                                                    <div>
                                                        <p className="text-sm font-medium">
                                                            {
                                                                ref.referenceId
                                                                    .value
                                                            }
                                                        </p>
                                                        {ref.description && (
                                                            <p className="text-sm text-gray-500">
                                                                {
                                                                    ref
                                                                        .description
                                                                        .value
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500">
                                        No references available
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="approvals" className="pt-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">
                                    Approvals
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {document.approvals &&
                                document.approvals.length > 0 ? (
                                    <ul className="space-y-4">
                                        {document.approvals.map(
                                            (approval, index) => (
                                                <li
                                                    key={index}
                                                    className="border-b pb-3 last:border-0 last:pb-0"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-sm font-medium">
                                                                {
                                                                    approval
                                                                        .role
                                                                        .value
                                                                }
                                                            </p>
                                                            {approval.name && (
                                                                <p className="text-sm">
                                                                    {
                                                                        approval
                                                                            .name
                                                                            .value
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="text-right">
                                                            {approval.date && (
                                                                <p className="text-sm text-gray-500">
                                                                    {formatDate(
                                                                        approval
                                                                            .date
                                                                            .value,
                                                                    )}
                                                                </p>
                                                            )}
                                                            {approval.signed !==
                                                                undefined &&
                                                                approval.signed !==
                                                                    null && (
                                                                    <Badge>
                                                                        {approval
                                                                            .signed
                                                                            .value
                                                                            ? 'Signed'
                                                                            : 'Unsigned'}
                                                                    </Badge>
                                                                )}
                                                        </div>
                                                    </div>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500">
                                        No approvals available
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

function renderTypeSpecificContent(document: AviationDocument) {
    if (isWorkOrder(document) || isEngineeringOrder(document)) {
        return (
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                        Work Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                        {document.estimatedManHours && (
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Estimated Man Hours
                                </p>
                                <p className="text-sm">
                                    {document.estimatedManHours.value}
                                </p>
                            </div>
                        )}
                        {document.actualManHours && (
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Actual Man Hours
                                </p>
                                <p className="text-sm">
                                    {document.actualManHours.value}
                                </p>
                            </div>
                        )}
                    </div>
                    {document.tasks && document.tasks.length > 0 && (
                        <div className="mt-4">
                            <p className="text-sm font-medium text-gray-500 mb-2">
                                Tasks
                            </p>
                            <ul className="space-y-2">
                                {document.tasks.map((task, index) => (
                                    <li
                                        key={index}
                                        className="border rounded-md p-3"
                                    >
                                        <div className="flex justify-between">
                                            <p className="text-sm font-medium">
                                                {task.taskId.value}
                                            </p>
                                            {task.signedOff && (
                                                <Badge>
                                                    {task.signedOff.value
                                                        ? 'Signed Off'
                                                        : 'Not Signed Off'}
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-sm mt-1">
                                            {task.description.value}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    }

    if (isTaskCard(document)) {
        return (
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                        Task Information
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        {document.estimatedManHours && (
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Estimated Man Hours
                                </p>
                                <p className="text-sm">
                                    {document.estimatedManHours.value}
                                </p>
                            </div>
                        )}
                        {document.actualManHours && (
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Actual Man Hours
                                </p>
                                <p className="text-sm">
                                    {document.actualManHours.value}
                                </p>
                            </div>
                        )}
                    </div>
                    <p className="text-sm font-medium text-gray-500 mb-2">
                        Tasks
                    </p>
                    <ul className="space-y-3">
                        {document.tasks.map((task, index) => (
                            <li key={index} className="border rounded-md p-3">
                                <div className="flex justify-between">
                                    <p className="text-sm font-medium">
                                        {task.taskId.value}
                                    </p>
                                    {task.signedOff && (
                                        <Badge>
                                            {task.signedOff.value
                                                ? 'Signed Off'
                                                : 'Not Signed Off'}
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-sm mt-1">
                                    {task.description.value}
                                </p>
                                {task.steps && task.steps.length > 0 && (
                                    <div className="mt-3 pl-3 border-l-2 border-gray-200">
                                        <p className="text-xs font-medium text-gray-500 mb-1">
                                            Steps
                                        </p>
                                        <ul className="space-y-1">
                                            {task.steps.map(
                                                (step, stepIndex) => (
                                                    <li
                                                        key={stepIndex}
                                                        className="text-xs flex items-start"
                                                    >
                                                        <span className="font-medium mr-1">
                                                            {
                                                                step.stepNumber
                                                                    .value
                                                            }
                                                            .
                                                        </span>
                                                        <span>
                                                            {
                                                                step.instruction
                                                                    .value
                                                            }
                                                        </span>
                                                        {step.completed && (
                                                            <Badge className="ml-2 text-xs">
                                                                {step.completed
                                                                    .value
                                                                    ? 'Completed'
                                                                    : 'Incomplete'}
                                                            </Badge>
                                                        )}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        );
    }

    if (isServiceBulletin(document) || isAirworthinessDirective(document)) {
        return (
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                        Compliance Information
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {document.compliance && (
                        <div className="grid grid-cols-2 gap-2">
                            {document.compliance.category && (
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Category
                                    </p>
                                    <p className="text-sm capitalize">
                                        {document.compliance.category.value}
                                    </p>
                                </div>
                            )}
                            {document.compliance.timeframe && (
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Timeframe
                                    </p>
                                    <p className="text-sm">
                                        {document.compliance.timeframe.value}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                    {isServiceBulletin(document) &&
                        document.estimatedManHours && (
                            <div className="mt-4">
                                <p className="text-sm font-medium text-gray-500">
                                    Estimated Man Hours
                                </p>
                                <p className="text-sm">
                                    {document.estimatedManHours.value}
                                </p>
                            </div>
                        )}
                </CardContent>
            </Card>
        );
    }

    return null;
}
