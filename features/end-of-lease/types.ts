export enum DocumentStatus {
    pending = 'pending',
    processing_ocr = 'processing_ocr',
    processing_compliance = 'processing_compliance',
    ai_verified = 'ai_verified',
    requires_attention = 'requires_attention',
    verified = 'verified',
}

export type AviationDocumentType =
    | 'WorkOrder'
    | 'EngineeringOrder'
    | 'TaskCard'
    | 'ServiceBulletin'
    | 'AirworthinessDirective'
    | 'ShippingManifest';

interface TypedValue {
    value: string;
    type: string;
}

interface TypedBool {
    value: boolean;
    type: string;
}

interface TypedNumber {
    value: number;
    type: string;
}

interface TypedDate {
    value: string;
    type: string;
}

interface TypedLocalizedString {
    value: string;
    type: string;
    language: string;
}

interface Aircraft {
    type: TypedLocalizedString;
    registration: TypedValue;
    serialNumber: TypedValue;
}

interface Reference {
    referenceType: string;
    referenceId: TypedValue;
    description: TypedLocalizedString | null;
}

interface Compliance {
    category: TypedValue;
    timeframe: TypedValue;
}

interface Step {
    stepNumber: TypedValue;
    instruction: TypedLocalizedString;
    completed: TypedBool;
}

interface SignedOff {
    value: boolean;
    type: string;
    by: TypedValue;
    date: TypedDate;
}

interface Task {
    taskId: TypedValue;
    description: TypedLocalizedString;
    steps: Step[];
    signedOff: SignedOff | null;
}

interface Approval {
    role: TypedValue;
    name: TypedValue;
    signed: TypedBool;
    date: TypedDate;
}

export type AviationDocument = {
    type: AviationDocumentType;
    id: TypedValue;
    title: TypedLocalizedString;
    issueDate: TypedDate;
    effectiveDate: TypedDate;
    expiryDate: TypedDate | null;
    aircraft: Aircraft;
    estimatedManHours: TypedNumber | null;
    actualManHours: TypedNumber | null;
    references: Reference[];
    priority: TypedValue;
    compliance: Compliance;
    issuingAuthority: TypedValue;
    tasks: Task[];
    approvals: Approval[];
};

export type ConnectedDocument = {
    id: number;
    type: 'EO' | 'WO';
    signed: boolean;
};

export interface LeasingDocument {
    id: number;
    teamId: number;
    fileId: number;
    leasingProjectId: number;
    status: DocumentStatus;
    createdAt: string;
    connectedDocuments: ConnectedDocument[] | null;
    updatedAt: string;
    raw: AviationDocument | null;
    seen: boolean;
}

export enum ProjectStatus {
    InProgress = 'in_progress',
    Done = 'done',
}

export enum LeasingAircraftStatus {
    active = 'active',
    maintenance = 'maintenance',
}

export type LeasingAircraft = {
    msn: string;
    type: string;
    registration: string;
    operator: string | null;
    status: LeasingAircraftStatus;
};

export interface LeasingProject {
    id: number;
    teamId: number;
    leasingAircraft: LeasingAircraft;
    title: string;
    status: ProjectStatus; // defaults to ProjectStatus.InProgress on creation
}

export function isWorkOrder(doc: AviationDocument) {
    return doc.type === 'WorkOrder';
}

export function isEngineeringOrder(doc: AviationDocument) {
    return doc.type === 'EngineeringOrder';
}

export function isTaskCard(doc: AviationDocument) {
    return doc.type === 'TaskCard';
}

export function isServiceBulletin(doc: AviationDocument) {
    return doc.type === 'ServiceBulletin';
}

export function isAirworthinessDirective(doc: AviationDocument) {
    return doc.type === 'AirworthinessDirective';
}

export interface Stats {
    type: AviationDocumentType;
    status: DocumentStatus;
    count: number;
}

export type Activity = {
    username: string;
    title: string;
    description: string | null;
    type: 'upload' | 'status_change' | 'ai_check';
    createdAt: string;
};
