'use client';

import {
    AlertTriangle,
    CheckCircle,
    Clock,
    FileSearch,
    FileText,
    LucideIcon,
    ShieldCheck,
} from 'lucide-react';

import { cn } from '@/lib/utils';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

export enum DocumentStatus {
    pending = 'pending',
    processing_ocr = 'processing_ocr',
    processing_compliance = 'processing_compliance',
    ai_verified = 'ai_verified',
    requires_attention = 'requires_attention',
    verified = 'verified',
}

interface DocumentStatusBadgeProps {
    status: DocumentStatus;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

interface StatusConfig {
    icon: LucideIcon;
    label: string;
    description: string;
    color: string;
    pulsate?: boolean;
}

export function DocumentStatusBadge({
    status,
    size = 'md',
    className,
}: DocumentStatusBadgeProps) {
    const statusConfig: Record<DocumentStatus, StatusConfig> = {
        [DocumentStatus.pending]: {
            icon: Clock,
            label: 'Pending',
            description: 'Document is waiting to be processed',
            color: 'bg-red-500',
        },
        [DocumentStatus.processing_ocr]: {
            icon: FileText,
            label: 'OCR',
            description: 'Document is being scanned for text',
            color: 'bg-red-500',
        },
        [DocumentStatus.processing_compliance]: {
            icon: FileSearch,
            label: 'Compliance',
            description: 'Document is being checked for compliance',
            color: 'bg-red-500',
        },
        [DocumentStatus.ai_verified]: {
            icon: ShieldCheck,
            label: 'AI Verified',
            description: 'Document has been verified by AI',
            color: 'bg-green-500',
        },
        [DocumentStatus.requires_attention]: {
            icon: AlertTriangle,
            label: 'Review',
            description: 'Document needs human review',
            color: 'bg-purple-500',
            pulsate: true,
        },
        [DocumentStatus.verified]: {
            icon: CheckCircle,
            label: 'Verified',
            description: 'Document has been fully verified',
            color: 'bg-green-500',
        },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    const circleSizes = {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
    };

    const isPulsating = config.pulsate;

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div
                        className={cn(
                            'relative rounded-full inline-flex items-center justify-center',
                            circleSizes[size],
                            config.color,
                            {
                                'animate-pulse': isPulsating,
                                'shadow-[0_0_10px_rgba(168,85,247,0.7)]':
                                    isPulsating,
                            },
                            className,
                        )}
                    />
                </TooltipTrigger>
                <TooltipContent className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span className="font-medium">{config.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {config.description}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
