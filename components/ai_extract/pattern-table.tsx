import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download, Trash2 } from 'lucide-react'
import { DbPattern, Pattern } from '@/lib/types'


interface PatternTableProps {
    patterns: DbPattern[];
    onDelete: (id: number) => void;
}

export function PatternsTable({ patterns, onDelete }: PatternTableProps ) {

    return (
        <div className="space-y-4">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {patterns.map((pattern) => (
                    <TableRow key={pattern.id}>
                        <TableCell>{pattern.id}</TableCell>
                        <TableCell>{pattern.type}</TableCell>
                        <TableCell>{pattern.value}</TableCell>
                        <TableCell>{new Date(pattern.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDelete(pattern.id)}
                                aria-label={`Delete pattern ${pattern.id}`}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    )
}
