import {
    AlertTriangle,
    Calendar,
    CheckCircle2,
    Clock,
    Plane,
} from 'lucide-react';

import { WorkOrder } from '@/lib/types';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

type WorkOrderCardProps = {
    workOrder: WorkOrder;
};

export default function WorkOrderCard({ workOrder }: WorkOrderCardProps) {
    const data = workOrder;

    return (
        <Card className="w-full max-w-3xl mx-auto bg-white shadow-lg">
            <CardHeader className="bg-gray-50 rounded-t-xl">
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-2xl font-bold text-gray-800">
                            Work Order
                        </CardTitle>
                        <p className="text-sm text-gray-600">
                            {data.workOrderNo}
                        </p>
                    </div>
                    <Badge
                        variant="secondary"
                        className="text-blue-600 bg-blue-100"
                    >
                        {data.taskNo}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                        <Plane className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Aircraft
                            </p>
                            <p className="text-base font-semibold">
                                {data.aircraftModel} ({data.snLoc})
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Issued Date
                            </p>
                            <p className="text-base font-semibold">
                                {formatDate(data.issuedDate)}
                            </p>
                        </div>
                    </div>
                </div>

                <Separator />

                <div>
                    <h3 className="text-lg font-semibold mb-2">
                        Task Description
                    </h3>
                    <p className="text-gray-700">{data.description}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Timeline</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Scheduled
                                </p>
                                <p className="text-base font-semibold">
                                    {formatDate(data.scheduledFrom)}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <AlertTriangle className="w-5 h-5 text-yellow-500" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Due Date
                                </p>
                                <p className="text-base font-semibold">
                                    {formatDate(data.scheduledTo)}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Implemented
                                </p>
                                <p className="text-base font-semibold">
                                    {data.implementationDate}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Labor Hours</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                            <Clock className="w-5 h-5 text-blue-500" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Estimated
                                </p>
                                <p className="text-base font-semibold">
                                    {data.manLabor} MH
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Clock className="w-5 h-5 text-green-500" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Actual
                                </p>
                                <p className="text-base font-semibold">
                                    {data.actualManLabor} MH
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">
                        Implementation Result
                    </h3>
                    <p className="text-gray-700 mb-2">
                        {data.implementationResult.split('\n')[0]}
                    </p>
                    <p className="text-gray-700">
                        {data.implementationResult.split('\n')[1]}
                    </p>
                </div>

                {data.remarks && (
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Remarks</h3>
                        <p className="text-gray-700">{data.remarks}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
