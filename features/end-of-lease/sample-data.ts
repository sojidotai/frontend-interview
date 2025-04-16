import { Cog, FileBadge, FileText, TriangleAlert, Wrench } from 'lucide-react';

import {
    DocumentStatus,
    LeasingAircraft,
    LeasingAircraftStatus,
    LeasingDocument,
    LeasingProject,
    ProjectStatus
} from './types';

export interface AviationDocument {
    id: string | number;
    status: DocumentStatus;
    title: string;
    issueDate?: string;
}

export const leasingAircraftList: LeasingAircraft[] = [
    {
        msn: 'B738-MAX-2201',
        type: 'Boeing 737 MAX 8',
        registration: 'N2201X',
        operator: 'ANA',
        status: LeasingAircraftStatus.active,
    },
    {
        msn: 'A320-NEO-2202',
        type: 'Airbus A320neo',
        registration: 'N2202Y',
        operator: 'Singapore Airlines',
        status: LeasingAircraftStatus.active,
    },
    {
        msn: 'A320-200-2203',
        type: 'Airbus A320-200',
        registration: 'N2203Z',
        operator: 'Peach Airlines',
        status: LeasingAircraftStatus.maintenance,
    },
    {
        msn: 'B738-800-2204',
        type: 'Boeing 737-800NG',
        registration: 'N2204A',
        operator: 'Jetstar',
        status: LeasingAircraftStatus.active,
    },
    {
        msn: 'A320-NEO-2205',
        type: 'Airbus A320neo',
        registration: 'N2205B',
        operator: 'Japan Airlines',
        status: LeasingAircraftStatus.active,
    },
    {
        msn: 'B738-800-2206',
        type: 'Boeing 737-800NG',
        registration: 'N2206C',
        operator: 'AirAsia',
        status: LeasingAircraftStatus.maintenance,
    },
    {
        msn: 'A320-200-2207',
        type: 'Airbus A320-200',
        registration: 'N2207D',
        operator: 'Emirates',
        status: LeasingAircraftStatus.active,
    },
    {
        msn: 'B738 MMAX-2208',
        type: 'Boeing 737 MAX 8',
        registration: 'N2208E',
        operator: 'Lufthansa',
        status: LeasingAircraftStatus.active,
    },
    {
        msn: 'A321-NEO-2209',
        type: 'Airbus A321neo',
        registration: 'N2209F',
        operator: 'Qatar Airways',
        status: LeasingAircraftStatus.active,
    },
    {
        msn: 'B738-800-2210',
        type: 'Boeing 737-800NG',
        registration: 'N2210G',
        operator: 'Cathay Pacific',
        status: LeasingAircraftStatus.maintenance,
    },
];

// Note: the file IDs are taken from staging for demo purposes :')
// Note to self: if we don't go from demo to POC, I'll post this on r/programminghorror
export const dummyMenu = [
    {
        name: 'Service Bulletins',
        icon: FileText,
        color: 'text-primary',
        clickable: true,
    },
    {
        name: 'Airworthiness Directives',
        icon: TriangleAlert,
        color: 'text-yellow-400',
        children: [
            {
                name: 'Airframe',
                children: [
                    {
                        id: 53,
                        name: '2014-0174',
                        title: 'Navigation – Terrain Awareness Warning System – Power Cycle (Reset)',
                    },
                ],
            },
            {
                name: 'Appliances',
                children: [
                    {
                        id: 54,
                        name: '2021-22-07',
                        title: 'Umlaut Engineering GmbH (previously P3 Engineering GmbH) HAFEX (Halon-free) Hand-Held Fire Extinguishers',
                    },
                ],
            },
        ],
    },
    {
        name: 'Components',
        icon: Cog,
        color: 'text-blue-400',
        children: [
            {
                name: 'HT Airworthiness Review Certificates',
                children: [
                    {
                        id: 55,
                        name: '20180005031258Y15',
                        title: 'AIRWORTHINESS APPROVAL TAG',
                    },
                ],
            },
            {
                name: 'OCCM Airworthiness Review Certificates',
                children: [
                    {
                        id: 56,
                        name: 'RT-C2023-3562',
                        title: 'AIRWORTHINESS APPROVAL TAG',
                    },
                ],
            },
        ],
    },
    {
        name: 'Other Modifications',
        icon: Wrench,
        color: 'text-green-400',
        children: [
            {
                name: 'EO Task',
                children: [
                    {
                        id: 57,
                        name: 'EO-2019-A320-25-522-R1',
                        title: 'Add the divider net on Aft cargo compartment for A320 model',
                    },
                ],
            },
            {
                name: 'STC DFP',
                icon: FileBadge,
                color: 'text-green-400',
                children: [
                    {
                        name: 'Carpets',
                        children: [
                            {
                                id: 58,
                                name: '12NW-510321',
                                title: 'VERTICAL FLAMMABILITY TEST RESULTS',
                            },
                        ],
                    },
                    {
                        name: 'Curtains',
                        children: [
                            {
                                id: 59,
                                name: '12-10332',
                                title: 'VERTICAL FLAMMABILITY TEST RESULTS',
                            },
                        ],
                    },
                    {
                        name: 'Dress Covers',
                        children: [
                            {
                                id: 60,
                                name: 'EF092735',
                                title: 'AUTHORIZED RELEASE CERTIFICATE',
                            },
                        ],
                    },
                    {
                        name: 'ELB',
                        children: [
                            {
                                id: 61,
                                name: 'MDA0547-XN',
                                title: 'MODIFICATION DESIGN APPROVAL',
                            },
                        ],
                    },
                    {
                        name: 'QACVR',
                        children: [
                            { id: 62, name: 'B6891-085', title: 'CAAC' },
                        ],
                    },
                ],
            },
        ],
    },
];

export const mockLeasingDocuments: LeasingDocument[] = [
{
    id: 1,
    teamId: 101,
    fileId: 501,
    leasingProjectId: 3001,
    status: DocumentStatus.pending,
    createdAt: '2025-04-01T10:20:30Z',
    updatedAt: '2025-04-02T12:00:00Z',
    connectedDocuments: [
    { id: 201, title: 'Initial Agreement Draft' }
    ],
    raw: {
    type: 'TechnicalDocument',
    id: { value: 'AVD-001', type: 'string' },
    title: { value: 'Lease Agreement', type: 'localized_string', language: 'en' },
    issueDate: { value: '2025-03-28', type: 'date' },
    effectiveDate: { value: '2025-04-01', type: 'date' },
    expiryDate: null,
    aircraft: {
        registration: { value: 'N12345', type: 'string' },
        model: { value: 'Boeing 737', type: 'string' },
        msn: { value: '45678', type: 'string' },
    },
    estimatedManHours: { value: 20, type: 'number' },
    actualManHours: null,
    references: [],
    priority: { value: 'High', type: 'string' },
    compliance: {
        type: { value: 'mandatory', type: 'string' },
        interval: { value: '12 months', type: 'string' }
    },
    issuingAuthority: { value: 'Aviation Authority', type: 'string' },
    tasks: [],
    approvals: []
    },
    seen: false
},
{
    id: 2,
    teamId: 102,
    fileId: 502,
    leasingProjectId: 3002,
    status: DocumentStatus.verified,
    createdAt: '2025-03-10T09:00:00Z',
    updatedAt: '2025-03-15T16:30:00Z',
    connectedDocuments: null,
    raw: {
    type: 'MaintenanceRecord',
    id: { value: 'AVD-002', type: 'string' },
    title: { value: 'Maintenance Log', type: 'localized_string', language: 'en' },
    issueDate: { value: '2025-03-01', type: 'date' },
    effectiveDate: { value: '2025-03-05', type: 'date' },
    expiryDate: { value: '2026-03-01', type: 'date' },
    aircraft: {
        registration: { value: 'G-ABCD', type: 'string' },
        model: { value: 'Airbus A320', type: 'string' },
        msn: { value: '87654', type: 'string' },
    },
    estimatedManHours: { value: 35, type: 'number' },
    actualManHours: { value: 32, type: 'number' },
    references: [],
    priority: { value: 'Medium', type: 'string' },
    compliance: {
        type: { value: 'optional', type: 'string' },
        interval: { value: '6 months', type: 'string' }
    },
    issuingAuthority: { value: 'Tech Aviation Services', type: 'string' },
    tasks: [],
    approvals: []
    },
    seen: true
},
{
    id: 3,
    teamId: 103,
    fileId: 503,
    leasingProjectId: 3003,
    status: DocumentStatus.requires_attention,
    createdAt: '2025-02-01T14:45:00Z',
    updatedAt: '2025-02-02T08:15:00Z',
    connectedDocuments: [
    { id: 202, title: 'Checklist Summary' },
    { id: 203, title: 'Inspection Photos' }
    ],
    raw: null,
    seen: false
}
];

export const mockLeasingProjects: LeasingProject[] = [
    {
      id: 1001,
      teamId: 201,
      leasingAircraft: {
        msn: '45678',
        type: 'Boeing 737-800',
        registration: 'N12345',
        operator: 'SkyHigh Airlines',
        status: LeasingAircraftStatus.active,
      },
      title: 'Q2 Lease Transition - Boeing 737',
      status: ProjectStatus.InProgress,
    },
    {
      id: 1002,
      teamId: 202,
      leasingAircraft: {
        msn: '87654',
        type: 'Airbus A320neo',
        registration: 'G-ABCD',
        operator: null,
        status: LeasingAircraftStatus.maintenance,
      },
      title: 'A320neo Redelivery Prep',
      status: ProjectStatus.Done,
    },
  ];
  