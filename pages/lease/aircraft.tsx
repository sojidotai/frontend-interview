import { AlertCircle, Search } from 'lucide-react';

import AppHeader from '@/components/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export default function AircraftFolder() {
    return (
        <div className="flex-1 h-full">
            <AppHeader
                links={[
                    { name: 'Leasing', href: '#' },
                    { name: 'Aircraft Folder', href: '#' },
                ]}
            />

            <div className="flex flex-col container my-12 gap-4">
                <div className="relative w-[300px]">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search aircraft..." className="pl-8" />
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Fleet Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>MSN</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Registration</TableHead>
                                    <TableHead>Operator</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Next Check</TableHead>
                                    <TableHead>Action Items</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">
                                        A320-1234
                                    </TableCell>
                                    <TableCell>A320neo</TableCell>
                                    <TableCell>N12345</TableCell>
                                    <TableCell>Peach Airlines</TableCell>
                                    <TableCell>
                                        <Badge className="bg-green-500/15 text-green-600 hover:bg-green-500/25">
                                            Active
                                        </Badge>
                                    </TableCell>
                                    <TableCell>C-Check (45 days)</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">
                                            12 open items
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">
                                        B738-5678
                                    </TableCell>
                                    <TableCell>737-800</TableCell>
                                    <TableCell>N67890</TableCell>
                                    <TableCell>ANA</TableCell>
                                    <TableCell>
                                        <Badge className="bg-yellow-500/15 text-yellow-600 hover:bg-yellow-500/25">
                                            Maintenance
                                        </Badge>
                                    </TableCell>
                                    <TableCell>A-Check (In Progress)</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">
                                            8 open items
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">
                                        A321-9012
                                    </TableCell>
                                    <TableCell>A321neo</TableCell>
                                    <TableCell>N54321</TableCell>
                                    <TableCell>Singapore Airlines</TableCell>
                                    <TableCell>
                                        <Badge className="bg-green-500/15 text-green-600 hover:bg-green-500/25">
                                            Active
                                        </Badge>
                                    </TableCell>
                                    <TableCell>D-Check (180 days)</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">
                                            3 open items
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Maintenance Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[300px]">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Aircraft</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Due Date</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>A320-1234</TableCell>
                                            <TableCell>C-Check</TableCell>
                                            <TableCell>2024-04-15</TableCell>
                                            <TableCell>
                                                <Badge>Scheduled</Badge>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>B738-5678</TableCell>
                                            <TableCell>A-Check</TableCell>
                                            <TableCell>2024-02-28</TableCell>
                                            <TableCell>
                                                <Badge>In Progress</Badge>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>A321-9012</TableCell>
                                            <TableCell>
                                                Engine Inspection
                                            </TableCell>
                                            <TableCell>2024-08-10</TableCell>
                                            <TableCell>
                                                <Badge>Scheduled</Badge>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </ScrollArea>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Compliance Alerts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[300px]">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 rounded-lg border p-4">
                                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                                        <div>
                                            <h4 className="font-medium">
                                                AD 2024-02 Due
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                A320-1234 requires AD compliance
                                                within 30 days
                                            </p>
                                            <div className="mt-2">
                                                <Badge>Due: 2024-03-20</Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 rounded-lg border p-4">
                                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                                        <div>
                                            <h4 className="font-medium">
                                                Certificate Expiration
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                B738-5678 airworthiness
                                                certificate expires in 45 days
                                            </p>
                                            <div className="mt-2">
                                                <Badge>Due: 2024-04-15</Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 rounded-lg border p-4">
                                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                                        <div>
                                            <h4 className="font-medium">
                                                SB Compliance Required
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                A321-9012 has pending Service
                                                Bulletin implementation
                                            </p>
                                            <div className="mt-2">
                                                <Badge>Due: 2024-03-30</Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Technical Records</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[300px]">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Aircraft</TableHead>
                                            <TableHead>Document Type</TableHead>
                                            <TableHead>Last Updated</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>A320-1234</TableCell>
                                            <TableCell>
                                                Weight & Balance
                                            </TableCell>
                                            <TableCell>2024-02-15</TableCell>
                                            <TableCell>
                                                <Badge>Current</Badge>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>B738-5678</TableCell>
                                            <TableCell>Engine Log</TableCell>
                                            <TableCell>2024-02-20</TableCell>
                                            <TableCell>
                                                <Badge>Current</Badge>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>A321-9012</TableCell>
                                            <TableCell>
                                                Configuration Status
                                            </TableCell>
                                            <TableCell>2024-02-18</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">
                                                    Update Required
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </ScrollArea>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Operational Metrics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[300px]">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Aircraft</TableHead>
                                            <TableHead>Flight Hours</TableHead>
                                            <TableHead>Cycles</TableHead>
                                            <TableHead>Utilization</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>A320-1234</TableCell>
                                            <TableCell>12,456</TableCell>
                                            <TableCell>4,567</TableCell>
                                            <TableCell>8.5 hrs/day</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>B738-5678</TableCell>
                                            <TableCell>24,789</TableCell>
                                            <TableCell>8,901</TableCell>
                                            <TableCell>9.2 hrs/day</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>A321-9012</TableCell>
                                            <TableCell>8,234</TableCell>
                                            <TableCell>2,345</TableCell>
                                            <TableCell>7.8 hrs/day</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
