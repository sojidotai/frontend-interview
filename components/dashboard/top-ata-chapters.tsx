'use client';

import React, { useMemo } from 'react';

import { Plane } from 'lucide-react';

import { ATAChapter } from '@/lib/dashboard-api';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface CompactAviationStatsCardProps {
    chapters: ATAChapter[];
}

const TopATAChaptersWidget: React.FC<CompactAviationStatsCardProps> = ({
    chapters: stats,
}) => {
    const totalDocuments = useMemo(
        () => stats.reduce((sum, stat) => sum + stat.documentCount, 0),
        [stats],
    );
    const totalAffectedModels = useMemo(
        () => stats.reduce((sum, stat) => sum + stat.affectedEngineModels, 0),
        [stats],
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex flex-row justify-between items-center">
                    Top ATA Chapters
                    <Plane className="text-blue-500 h-6 w-6" />
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                        <p className="text-xs text-blue-800 font-semibold">
                            Total Documents
                        </p>
                        <p className="text-2xl font-bold text-blue-900">
                            {totalDocuments}
                        </p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                        <p className="text-xs text-blue-800 font-semibold">
                            Total Affected Models
                        </p>
                        <p className="text-2xl font-bold text-blue-900">
                            {totalAffectedModels}
                        </p>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[30%] text-xs">
                                ATA Chapter
                            </TableHead>
                            <TableHead className="w-[35%] text-xs">
                                Documents
                            </TableHead>
                            <TableHead className="w-[35%] text-xs">
                                Affected Models
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {stats.map((stat, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-sm font-medium">
                                    {stat.ataChapter}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {stat.documentCount}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {stat.affectedEngineModels}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default TopATAChaptersWidget;
