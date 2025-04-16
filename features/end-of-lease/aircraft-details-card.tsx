import {
    Clipboard,
    Copy,
    FileText,
    Plane,
    Settings,
    Shield,
    Tag,
    User,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

export default function AircraftDetailsCard() {
    return (
        <TooltipProvider>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Aircraft Status</CardTitle>
                        <Badge variant="secondary" className="font-mono">
                            A320-214
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6">
                        {/* Primary Identification Section */}
                        <div className="rounded-lg bg-zinc-100/40 p-3">
                            <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                                Primary Identification
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-start gap-2">
                                    <Tag className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <div className="text-xs font-medium text-muted-foreground">
                                            Registration
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="font-mono font-medium">
                                                B6891
                                            </span>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button className="rounded-full p-0.5 hover:bg-muted">
                                                        <Copy className="h-3 w-3 text-muted-foreground" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    Copy registration
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Clipboard className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <div className="text-xs font-medium text-muted-foreground">
                                            MSN
                                        </div>
                                        <div className="font-mono font-medium">
                                            5047
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Leasing Information */}
                        <div>
                            <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                                Leasing Information
                            </h3>
                            <div className="grid grid-cols-2 gap-y-4">
                                <div className="flex items-start gap-2">
                                    <User className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <div className="text-xs font-medium text-muted-foreground">
                                            Lessee
                                        </div>
                                        <div className="font-medium">Peach</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Shield className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <div className="text-xs font-medium text-muted-foreground">
                                            Lessor
                                        </div>
                                        <div className="font-medium">
                                            Airborne Capital
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Technical Information */}
                        <div>
                            <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                                Technical Information
                            </h3>
                            <div className="grid gap-y-4">
                                <div className="flex items-start gap-2">
                                    <Settings className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <div className="text-xs font-medium text-muted-foreground">
                                            Airframe Configuration
                                        </div>
                                        <div className="font-medium font-mono">
                                            A320-214 Config
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-start gap-2">
                                        <FileText className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <div className="text-xs font-medium text-muted-foreground">
                                                Aircraft Effectivity No.
                                            </div>
                                            <div className="font-medium font-mono">
                                                AE-2024-01
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <FileText className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <div className="text-xs font-medium text-muted-foreground">
                                                Engine Effectivity No.
                                            </div>
                                            <div className="font-medium font-mono">
                                                EE-2024-02
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TooltipProvider>
    );
}
