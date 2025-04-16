import { useState } from 'react';

import {
    useDocument,
    useUpdateDocumentStatus,
} from '@/features/end-of-lease/api';
import { DocumentStatusBadge } from '@/features/end-of-lease/document-status-badge';
import EOPreview from '@/features/end-of-lease/eo-preview';
import Preview from '@/features/end-of-lease/preview';
import { DocumentStatus } from '@/features/end-of-lease/types';
import { CircleX, Info, Lock, PanelRight, X } from 'lucide-react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';

import AppHeader from '@/components/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

const Page = () => {
    const router = useRouter();
    const documentId = Number(router.query.id);
    const [showDetails, setShowDetails] = useState(false);

    const { data: document } = useDocument(documentId);
    const updateDocumentStatus = useUpdateDocumentStatus(documentId);

    const handleUpdateStatus = async (status: DocumentStatus) => {
        toast.promise(updateDocumentStatus.mutateAsync({ status }), {
            loading: 'Updating status...',
            success: 'Status updated successfully',
            error: 'Failed to update status',
        });
    };

    const hasConnectedDocuments =
        (document?.connectedDocuments?.filter((cd) => cd.id != document.id)
            ?.length || 0) > 0;

    const showVerifyReview = document?.raw?.type == 'ServiceBulletin';

    if (!document || document?.raw === null) {
        return (
            <div className="flex-1 h-full flex items-center justify-center">
                <Card className="w-96">
                    <CardHeader>
                        <CardTitle>Document not found</CardTitle>
                        <CardDescription>
                            The requested document could not be loaded
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            variant="outline"
                            onClick={() => router.push('/leasing/dashboard')}
                        >
                            Back to Dashboard
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex-1 h-full overflow-hidden flex flex-col">
            <AppHeader
                links={[
                    { name: 'End of Lease', href: '/' },
                    { name: 'Documents', href: '/leasing/dashboard' },
                    { name: `${documentId}`, href: '#' },
                ]}
            />

            <div className="flex flex-1 overflow-hidden h-full">
                {/* Main content area */}
                <div className="flex-1 flex flex-col h-full overflow-y-auto p-6">
                    {/* Document header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <DocumentStatusBadge
                                size="sm"
                                status={document.status}
                            />
                            <h1 className="text-xl max-w-3xl font-semibold truncate">
                                {document.raw?.title?.value ||
                                    `Service Bulletin ${document.raw?.id?.value}`}
                            </h1>
                        </div>

                        <div className="flex gap-2">
                            {showVerifyReview && (
                                <>
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            handleUpdateStatus(
                                                DocumentStatus.verified,
                                            )
                                        }
                                        className="gap-2"
                                        disabled={
                                            document.status ==
                                            DocumentStatus.verified
                                        }
                                    >
                                        <Lock className="size-4 text-green-500" />
                                        Verify
                                    </Button>

                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            handleUpdateStatus(
                                                DocumentStatus.requires_attention,
                                            )
                                        }
                                        className="gap-2"
                                        disabled={
                                            document.status ==
                                            DocumentStatus.requires_attention
                                        }
                                    >
                                        <CircleX className="size-4 text-red-500" />
                                        Needs Review
                                    </Button>
                                </>
                            )}
                            <Button
                                variant="outline"
                                onClick={() => setShowDetails(!showDetails)}
                                className="gap-2"
                            >
                                <Info className="size-4" />
                                Details
                            </Button>
                        </div>
                    </div>

                    {/* Connected documents section */}
                    {hasConnectedDocuments && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-2">
                            {document.connectedDocuments
                                ?.filter((cd) => cd.id != document.id)
                                .map((cd) => (
                                    <EOPreview key={cd.id} document={cd} />
                                ))}
                        </div>
                    )}

                    {/* Document preview */}
                    <div className="flex-1 min-h-0 rounded-lg border overflow-hidden bg-white h-full">
                        <Preview docId={document.id} />
                    </div>
                </div>

                {/* Side panel for details */}
                {showDetails && (
                    <div className="w-96 h-full border-l bg-background p-6 overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">
                                Document Details
                            </h2>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowDetails(false)}
                            >
                                <X className="size-4" />
                            </Button>
                        </div>

                        <Collapsible className="mb-4" defaultOpen>
                            <CollapsibleTrigger className="w-full">
                                <div className="flex items-center justify-between w-full p-3 bg-muted rounded-md font-medium">
                                    Aircraft Information
                                    <PanelRight className="size-4" />
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="p-3 pt-4 space-y-2 text-sm">
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-muted-foreground">
                                        Type
                                    </span>
                                    <span className="font-medium">
                                        {document.raw?.aircraft?.type?.value}
                                    </span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-muted-foreground">
                                        Registration
                                    </span>
                                    <span className="font-medium">
                                        {
                                            document.raw?.aircraft?.registration
                                                ?.value
                                        }
                                    </span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-muted-foreground">
                                        Serial Number
                                    </span>
                                    <span className="font-medium">
                                        {
                                            document.raw?.aircraft?.serialNumber
                                                ?.value
                                        }
                                    </span>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>

                        <Collapsible className="mb-4" defaultOpen>
                            <CollapsibleTrigger className="w-full">
                                <div className="flex items-center justify-between w-full p-3 bg-muted rounded-md font-medium">
                                    Compliance Information
                                    <PanelRight className="size-4" />
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="p-3 pt-4 space-y-2 text-sm">
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-muted-foreground">
                                        Category
                                    </span>
                                    <Badge variant="outline">
                                        {
                                            document.raw?.compliance?.category
                                                ?.value
                                        }
                                    </Badge>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-muted-foreground">
                                        Timeframe
                                    </span>
                                    <span className="font-medium">
                                        {
                                            document.raw?.compliance?.timeframe
                                                ?.value
                                        }
                                    </span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-muted-foreground">
                                        Authority
                                    </span>
                                    <span className="font-medium">
                                        {document.raw?.issuingAuthority?.value}
                                    </span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-muted-foreground">
                                        Issue Date
                                    </span>
                                    <span className="font-medium">
                                        {new Date(
                                            document.raw?.issueDate?.value,
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>

                        <Collapsible className="mb-4" defaultOpen>
                            <CollapsibleTrigger className="w-full">
                                <div className="flex items-center justify-between w-full p-3 bg-muted rounded-md font-medium">
                                    Manpower Requirements
                                    <PanelRight className="size-4" />
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="p-3 pt-4 space-y-2 text-sm">
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-muted-foreground">
                                        Estimated Hours
                                    </span>
                                    <span className="font-medium">
                                        {document.raw?.estimatedManHours
                                            ?.value || 'N/A'}
                                    </span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-muted-foreground">
                                        Actual Hours
                                    </span>
                                    <span className="font-medium">
                                        {document.raw?.actualManHours?.value ||
                                            'Not recorded'}
                                    </span>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>

                        {document.raw?.approvals?.length > 0 && (
                            <Collapsible className="mb-4">
                                <CollapsibleTrigger className="w-full">
                                    <div className="flex items-center justify-between w-full p-3 bg-muted rounded-md font-medium">
                                        Approvals
                                        <PanelRight className="size-4" />
                                    </div>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="p-3 pt-4 space-y-3 text-sm">
                                    {document.raw.approvals.map(
                                        (approval, i) => (
                                            <div
                                                key={i}
                                                className="border rounded-md p-2"
                                            >
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">
                                                        Role
                                                    </span>
                                                    <span className="font-medium">
                                                        {approval.role.value}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">
                                                        Name
                                                    </span>
                                                    <span className="font-medium">
                                                        {approval.name.value}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">
                                                        Signed
                                                    </span>
                                                    <Badge
                                                        variant={
                                                            approval.signed
                                                                .value
                                                                ? 'default'
                                                                : 'outline'
                                                        }
                                                    >
                                                        {approval.signed.value
                                                            ? 'Yes'
                                                            : 'No'}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </CollapsibleContent>
                            </Collapsible>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
