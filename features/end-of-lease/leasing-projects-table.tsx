// components/LeasingProjectsTable.tsx
import { ProjectStatus } from '@/features/end-of-lease/types';
import {
    AlertTriangle,
    CheckCircle,
    ChevronRight,
    Lock,
    Trash2,
} from 'lucide-react';

import TrafficLight from '@/components/traffic-light';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface LeasingProjectsTableProps {
    projects: any[]; // Using any for simplicity, but ideally this would be a proper type
    onRowClick: (id: number) => void;
    onDelete: (id: number) => void;
    onStatusUpdate: (projectId: number, status: ProjectStatus) => void;
}

export default function LeasingProjectsTable({
    projects,
    onRowClick,
    onDelete,
    onStatusUpdate,
}: LeasingProjectsTableProps) {
    // Simulated compliance calculation
    const getComplianceStatus = (project: any) => {
        // This is a fake calculation - in a real app, this would use actual data
        const seed = (project.id * 11) % 3; // Deterministic but seemingly random
        if (seed === 0) return 'red';
        if (seed === 1) return 'yellow';
        return 'green';
    };

    const handleActionClick = (e: React.MouseEvent, callback: () => void) => {
        e.stopPropagation();
        callback();
    };

    return (
        <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow>
                        <TableHead className="w-[80px]">ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>MSN</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Registration</TableHead>
                        <TableHead>Lease Period</TableHead>
                        <TableHead>Lessor</TableHead>
                        <TableHead>Compliance</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projects?.map((project) => {
                        const isDone = project.status === 'done';
                        const complianceStatus = isDone
                            ? 'green'
                            : getComplianceStatus(project);

                        return (
                            <TableRow
                                key={project.id}
                                className="cursor-pointer hover:bg-muted/50 transition-colors"
                                onClick={() => onRowClick(project.id)}
                            >
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`h-2.5 w-2.5 rounded-full ${
                                                isDone
                                                    ? 'bg-green-500'
                                                    : 'bg-yellow-400'
                                            }`}
                                        />
                                        {project.id}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">
                                    {project.title}
                                </TableCell>
                                <TableCell>
                                    {project.leasingAircraft.msn}
                                </TableCell>
                                <TableCell>
                                    {project.leasingAircraft.type}
                                </TableCell>
                                <TableCell>
                                    {project.leasingAircraft.registration}
                                </TableCell>
                                <TableCell>
                                    {/* Simulated lease period */}
                                    {`${new Date(2022 + (project.id % 3), project.id % 12).toLocaleDateString()} -
                                    ${new Date(2025 + (project.id % 3), project.id % 12).toLocaleDateString()}`}
                                </TableCell>
                                <TableCell>
                                    {/* Simulated lessor */}
                                    {
                                        [
                                            'Aircastle',
                                            'AerCap',
                                            'GECAS',
                                            'BOC Aviation',
                                        ][project.id % 4]
                                    }
                                </TableCell>
                                <TableCell>
                                    {isDone ? (
                                        <div className="flex items-center">
                                            <Lock className="h-4 w-4 text-green-600 mr-2" />
                                            <span className="text-green-600 font-medium text-sm">
                                                Locked
                                            </span>
                                        </div>
                                    ) : (
                                        <TrafficLight
                                            status={
                                                complianceStatus == 'red'
                                                    ? 'critical'
                                                    : complianceStatus ==
                                                        'yellow'
                                                      ? 'warning'
                                                      : 'success'
                                            }
                                            size="sm"
                                        />
                                    )}
                                </TableCell>
                                <TableCell className="flex justify-end gap-2 items-center">
                                    {!isDone && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={(e) =>
                                                handleActionClick(e, () =>
                                                    onStatusUpdate(
                                                        project.id,
                                                        ProjectStatus.Done,
                                                    ),
                                                )
                                            }
                                            className="text-xs"
                                        >
                                            Mark Complete
                                        </Button>
                                    )}
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={(e) =>
                                            handleActionClick(e, () =>
                                                onDelete(project.id),
                                            )
                                        }
                                    >
                                        <Trash2 className="h-4 w-4 text-amber-600 hover:scale-105 transition-all" />
                                    </Button>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
