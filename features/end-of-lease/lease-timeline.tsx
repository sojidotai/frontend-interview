'use client';

import * as React from 'react';

import {
    AlertCircle,
    Calendar,
    CheckCircle,
    ClipboardCheck,
    DollarSign,
    FileCheck,
    FileText,
    Plane,
    RotateCcw,
    Shield,
    Wrench,
} from 'lucide-react';

import { cn } from '@/lib/utils';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type MilestoneCategory = 'pre-delivery' | 'operational' | 'end-of-lease';

interface Milestone {
    id: string;
    title: string;
    description: string;
    department: string;
    category: MilestoneCategory;
    completed?: boolean;
    date?: string;
    icon: React.ReactNode;
}

export default function LeaseTimeline() {
    const milestones: Milestone[] = [
        // Pre-Delivery Milestones
        {
            id: 'loi',
            title: 'LOI/Term Sheet Execution',
            description:
                'Signing the Letter of Intent or Term Sheet, outlining the key terms.',
            department: 'Legal',
            category: 'pre-delivery',
            completed: true,
            date: '15.11.2024',
            icon: <FileText className="h-4 w-4" />,
        },
        {
            id: 'contract',
            title: 'Contract Negotiation & Execution',
            description: 'Finalizing and signing the full lease agreement.',
            department: 'Legal/Commercial',
            category: 'pre-delivery',
            completed: true,
            date: '30.11.2024',
            icon: <FileCheck className="h-4 w-4" />,
        },
        {
            id: 'pdi',
            title: 'Pre-Delivery Inspection',
            description:
                'Inspection of the aircraft by the lessee before delivery.',
            department: 'Technical/Commercial',
            category: 'pre-delivery',
            completed: false,
            icon: <ClipboardCheck className="h-4 w-4" />,
        },
        {
            id: 'deposit',
            title: 'Security Deposit Payment',
            description:
                'Lessee pays the security deposit as per the contract terms.',
            department: 'Financial',
            category: 'pre-delivery',
            completed: false,
            icon: <DollarSign className="h-4 w-4" />,
        },
        {
            id: 'insurance',
            title: 'Insurance Policies in Place',
            description:
                'Confirmation that all required insurance policies are in effect.',
            department: 'Legal/Risk',
            category: 'pre-delivery',
            completed: false,
            icon: <Shield className="h-4 w-4" />,
        },
        {
            id: 'approvals',
            title: 'Regulatory Approvals',
            description:
                'Obtaining necessary approvals from aviation authorities for operation.',
            department: 'Legal',
            category: 'pre-delivery',
            completed: false,
            icon: <CheckCircle className="h-4 w-4" />,
        },
        {
            id: 'delivery',
            title: 'Delivery Date Confirmation',
            description:
                'Finalizing and confirming the date and location of aircraft delivery.',
            department: 'Logistics',
            category: 'pre-delivery',
            completed: false,
            icon: <Calendar className="h-4 w-4" />,
        },

        // Operational Milestones
        {
            id: 'rental',
            title: 'Lease Rental Payments',
            description: 'Scheduled lease payments are made on time.',
            department: 'Financial',
            category: 'operational',
            icon: <DollarSign className="h-4 w-4" />,
        },
        {
            id: 'maintenance-reserve',
            title: 'Maintenance Reserve Payments',
            description: 'Regular payments into the maintenance reserve fund.',
            department: 'Financial/Technical',
            category: 'operational',
            icon: <DollarSign className="h-4 w-4" />,
        },
        {
            id: 'scheduled-maintenance',
            title: 'Scheduled Maintenance Events',
            description: 'Completion of scheduled maintenance checks.',
            department: 'Technical',
            category: 'operational',
            icon: <Wrench className="h-4 w-4" />,
        },
        {
            id: 'reporting',
            title: 'Reporting Requirements',
            description:
                'Lessee provides regular reports on flight hours, cycles, maintenance activities.',
            department: 'Compliance',
            category: 'operational',
            icon: <ClipboardCheck className="h-4 w-4" />,
        },
        {
            id: 'insurance-renewals',
            title: 'Insurance Renewals',
            description:
                'Renewal of insurance policies to maintain continuous coverage.',
            department: 'Legal/Risk',
            category: 'operational',
            icon: <Shield className="h-4 w-4" />,
        },
        {
            id: 'ads',
            title: 'Compliance with Airworthiness Directives',
            description:
                'Implementation of ADs issued by aviation authorities.',
            department: 'Technical/Compliance',
            category: 'operational',
            icon: <AlertCircle className="h-4 w-4" />,
        },

        // End-of-Lease Milestones
        {
            id: 'notice',
            title: 'Notice of Lease Expiry/Renewal',
            description:
                'Lessee provides notice of intent to renew or terminate the lease.',
            department: 'Legal/Commercial',
            category: 'end-of-lease',
            icon: <FileText className="h-4 w-4" />,
        },
        {
            id: 'eol-inspection',
            title: 'End-of-Lease Inspection',
            description:
                'Inspection of the aircraft to assess its condition upon return.',
            department: 'Technical/Commercial',
            category: 'end-of-lease',
            icon: <ClipboardCheck className="h-4 w-4" />,
        },
        {
            id: 'return-conditions',
            title: 'Return Conditions Compliance',
            description:
                'Verification that the aircraft meets all return conditions.',
            department: 'Technical/Legal',
            category: 'end-of-lease',
            icon: <CheckCircle className="h-4 w-4" />,
        },
        {
            id: 'reserve-reconciliation',
            title: 'Maintenance Reserve Reconciliation',
            description:
                'Final reconciliation of the maintenance reserve fund.',
            department: 'Financial',
            category: 'end-of-lease',
            icon: <DollarSign className="h-4 w-4" />,
        },
        {
            id: 'redelivery',
            title: 'Aircraft Redelivery',
            description:
                'Physical return of the aircraft to the lessor at the agreed-upon location.',
            department: 'Logistics',
            category: 'end-of-lease',
            icon: <Plane className="h-4 w-4" />,
        },
        {
            id: 'deposit-release',
            title: 'Release of Security Deposit',
            description:
                'Return of the security deposit to the lessee, less any deductions.',
            department: 'Financial',
            category: 'end-of-lease',
            icon: <RotateCcw className="h-4 w-4" />,
        },
    ];

    const categoryLabels: Record<MilestoneCategory, string> = {
        'pre-delivery': 'Pre-Delivery/Commencement',
        operational: 'Operational/Ongoing',
        'end-of-lease': 'End-of-Lease',
    };

    const categoryIcons: Record<MilestoneCategory, React.ReactNode> = {
        'pre-delivery': <Plane className="h-5 w-5 text-primary" />,
        operational: <Wrench className="h-5 w-5 text-zinc-300" />,
        'end-of-lease': <CheckCircle className="h-5 w-5 text-zinc-300" />,
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Aircraft Leasing Timeline</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible>
                    {(Object.keys(categoryLabels) as MilestoneCategory[]).map(
                        (category) => (
                            <AccordionItem key={category} value={category}>
                                <AccordionTrigger className="w-full px-4 hover:bg-gray-100 rounded-md hover:no-underline">
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-4">
                                            {categoryIcons[category]}
                                            <span className="font-medium">
                                                {categoryLabels[category]}
                                            </span>
                                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                                {
                                                    milestones.filter(
                                                        (m) =>
                                                            m.category ===
                                                            category,
                                                    ).length
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="px-4 pb-3">
                                        <div className="relative">
                                            <div className="absolute left-4 top-4 bottom-4 border border-l border-dashed border-gray-400"></div>
                                            <ul className="space-y-4 relative">
                                                {milestones
                                                    .filter(
                                                        (milestone) =>
                                                            milestone.category ===
                                                            category,
                                                    )
                                                    .map((milestone) => (
                                                        <li
                                                            key={milestone.id}
                                                            className="pt-1 pl-10 relative"
                                                        >
                                                            <div className="absolute left-0 top-1.5 flex items-center justify-center w-8 h-8">
                                                                <div
                                                                    className={cn(
                                                                        'flex items-center justify-center w-8 h-8 rounded-full border-2 bg-white shadow',
                                                                        milestone.completed
                                                                            ? 'border-green-500 text-green-500 shadow-green-200'
                                                                            : 'border-zinc-300 text-zinc-400 border-dashed',
                                                                    )}
                                                                >
                                                                    {
                                                                        milestone.icon
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <div className="flex items-center gap-2">
                                                                    <h4
                                                                        className={cn(
                                                                            'text-sm text-gray-500',
                                                                            milestone.completed &&
                                                                                'font-bold text-black',
                                                                        )}
                                                                    >
                                                                        {
                                                                            milestone.title
                                                                        }
                                                                    </h4>
                                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                                                                        {
                                                                            milestone.department
                                                                        }
                                                                    </span>
                                                                    {milestone.date && (
                                                                        <span className="text-xs text-gray-500">
                                                                            {
                                                                                milestone.date
                                                                            }
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <p className="text-xs text-gray-500 mt-0.5">
                                                                    {
                                                                        milestone.description
                                                                    }
                                                                </p>
                                                            </div>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ),
                    )}
                </Accordion>
            </CardContent>
        </Card>
    );
}
