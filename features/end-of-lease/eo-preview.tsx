import { CheckCircle2, FileText } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { useDocument, usePreview } from './api';
import HoursBadge from './hours-badge';
import { ConnectedDocument } from './types';

type EOPreviewProps = {
    document: ConnectedDocument;
};

const EOPreview = ({ document }: EOPreviewProps) => {
    const { data: url } = usePreview(document.id);
    const { data: eo } = useDocument(document.id);

    const manHours = {
        actual: eo?.raw?.actualManHours?.value,
        estimated: eo?.raw?.estimatedManHours?.value,
    };
    const manHoursPresent = !!(manHours.actual && manHours.estimated);

    return (
        <Card className="transition-all hover:shadow-md">
            <CardContent className="p-4 flex flex-col">
                <div className="flex flex-row items-center justify-between">
                    <Badge className="bg-zinc-100 text-zinc-700 font-medium">
                        {document.type}
                    </Badge>

                    {url && (
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            <Button variant="default" size="sm">
                                Open
                            </Button>
                        </a>
                    )}
                </div>

                <div className="mt-2">
                    <h3 className="font-medium text-sm line-clamp-2 text-slate-800">
                        {eo?.raw?.title?.value || 'Untitled Document'}
                    </h3>

                    <div className="text-xs">{eo?.raw?.id.value}</div>

                    <div className="mt-3 flex items-center text-xs text-slate-500">
                        <FileText className="h-3.5 w-3.5 mr-1" />
                        <span>
                            {eo?.raw?.aircraft?.registration?.value ||
                                eo?.raw?.aircraft?.serialNumber?.value ||
                                'No aircraft info'}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 text-xs my-2">
                        {eo?.raw?.approvals.map((a) => (
                            <>
                                <div className="font-bold">
                                    {a.name.value || a.role.value}
                                </div>
                                <div className="text-primary text-right">
                                    {(a.signed && 'signed') || a.date}
                                </div>
                            </>
                        ))}
                    </div>

                    <div className="flex flex-row justify-between">
                        <HoursBadge
                            actualHours={manHours.actual}
                            estimatedHours={manHours.estimated}
                        />

                        {eo?.raw?.approvals.find((a) => a.signed) && (
                            <div className="mt-1 flex items-center text-xs text-emerald-600">
                                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                                <span>Verified</span>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default EOPreview;
