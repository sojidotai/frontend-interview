import { UUID } from 'crypto';

export type Meta = {
    pageCount?: number;
    page?: number;
};

export type RAGModel = {
    id: string;
    displayName: string;
};

export type RAGSource = {
    documentId: number;
    displayId: number;
    documentName: string | null;
    content: string;
    score: number;
    meta: Meta | null;
};

export type Chunk = {
    id: number;
    documentId: number;
    content: string;
    meta: Meta | null;
};

export type Chapter = {
    id: number;
    documentId: number;
    content: string;
    pageStart: number;
    pageEnd: number;
};

export enum DocumentState {
    indexing = 'indexing',
    ok = 'ok',
    deleting = 'deleting',
    error = 'error',
}

export type Document = {
    id: number;
    name: string;
    state: DocumentState;
    createdAt: string;
    updatedAt: string;
    tag: string;
    fileSize: number;
    revision: number | null;
    sbNumber: string | null;
    ataChapter: string | null;
    ataChapterTitle: string | null;
    sbTitle: string | null;
    engineModel: string | null;
    issueDate: string | null;
    isLatestRevision: boolean;
    content: string | null;
};

export type ComplianceDocument = {
    id: number;
    number: string;
    issuedBy: string;
    issueDate: string;
    ataChapter: string;
    subject: string;
    approvalHolder: string;
    typeDesignation: string;
    effectiveDate: string;
    revision: string;
    correction: string;
    supersedure: string;
    publicationsInfo: string;
    remarks: string;
    attachment: string;
};

export type Table = {
    id: number;
    documentId: number;
    team_id: number;
    page: number;
    data: any[];
    title: string;
};

export type Image = {
    id: number;
    title: string;
    page: number;
};

export type Hyperlink = {
    id: number;
    type: string;
    destination: string;
    source: number;
    text: string;
};

export enum SearchType {
    chunk = 'chunk',
    document = 'document',
}

export interface ChunkRAGPlus extends Chunk {
    type: SearchType;
    documentName: string;
    table?: Table | null;
    image?: Image | null;
    matches: number;
    score: number;
}

export interface DocumentRAGPlus extends Document {
    type: SearchType;
    documentName: string;
    matches: number;
    score: number;
}

export type PDFHit = {
    displayId: number;
    document: Document;
    matches: number;
    score: number;
    chunk: Chunk | null;
    image: Image | null;
    table: Table | null;
};

export type Progress = {
    document_id: number;
    document_name: string;
    page: number;
    total_page: number;
    progress: number;
    is_found: boolean;
    serial_numbers: string[];
};

export type SerialNumberWithID = {
    display_id: number;
    serial_number: string;
    source: number[];
};

export type Alert = {
    content: string;
    alert_type: string;
};

export enum AIRouterModels {
    GPT_3_5_TURBO = 'gpt-3.5-turbo',
    GPT_4_TURBO = 'gpt-4-turbo',
    GPT_4O = 'gpt-4o',
    MISTRAL_SMALL_LATEST = 'mistral-small-latest',
    MISTRAL_MEDIUM_LATEST = 'mistral-medium-latest',
    MISTRAL_LARGE_LATEST = 'mistral-large-latest',
    MIXTRAL_8X7B = 'mixtral-8x7b',
    MIXTRAL_8X22B = 'mixtral-8x22b',
    CLAUDE_3_HAIKU = 'claude-3-haiku',
    CLAUDE_3_SONNET = 'claude-3-sonnet',
    CLAUDE_3_OPUS = 'claude-3-opus',
    LLAMA3_70B = 'llama3-70b',
    COMMAND_R_PLUS = 'command-r-plus',
    QWEN2_72B = 'qwen2-72B',
    GEMINI_1_5_PRO = 'gemini-1.5-pro',
    GEMINI_1_5_FLASH = 'gemini-1.5-flash',
    CLAUDE_3_5_SONNET = 'claude-3-5-sonnet',
}

export const OPEN_SOURCE_MODELS: AIRouterModels[] = [
    AIRouterModels.MIXTRAL_8X7B,
    AIRouterModels.MIXTRAL_8X22B,
    AIRouterModels.LLAMA3_70B,
];

enum AdvisorySourceStatus {
    New = 'new',
    Ok = 'ok',
    Error = 'error',
}

export type CreateAdvisorySource = {
    startUrl: string;
    maxAge: Date;
};

export type AdvisorySource = {
    startUrl: string;
    lastScraped: Date | null;
    status: AdvisorySourceStatus;
    maxAge: Date;
    createdAt: Date;
    updatedAt: Date;
};

export type DbAdvisorySource = AdvisorySource & {
    id: number;
    teamId: number;
};

export type Advisory = {
    link: string;
    downloadLinks: string[];
    number: string | null;
    issuedBy: string | null;
    issueDate: Date | null;
    subject: string | null;
    effectiveDate: Date | null;
    ataChapter: number | null;
    manufacturer: string | null;
    models: JSON | null;
    revision: string | null;
    correction: string | null;
    supersedure: string | null;
    publications: string | null;
    remarks: string | null;
    createdAt: Date;
    updatedAt: Date;
};

export type DbAdvisory = Advisory & {
    id: number;
    teamId: number;
    advisorySourceId: number;
};

export enum ScraperStatus {
    active = 'active',
    paused = 'paused',
}

export type ScraperLog = {
    status: ScraperStatus;
    createdAt: Date;
    updatedAt: Date;
};

export type DbScraperLog = ScraperLog & {
    id: number;
    teamId: number;
};

export type CommitInfo = {
    commitSha: string;
    commitMessage: string;
    commitDate: string;
};

export type OllamaModel = {
    name: string;
    model: string;
    size: number;
};

// Health checks
export type LLMStatus = {
    name: string;
    keyPresent: string;
    envVarName: string;
};

export type DatabaseStatus = {
    version: string;
    databaseName: string;
    databaseSize: string;
    connectionCount: number;
    extensions: string[];
};

export type OllamaStatus = {
    host: string;
    connected: boolean;
    models: string[];
};

export type MigrationStatus = {
    totalCount: number;
    latestName: string;
    latestDate: string;
};

export type SystemStatus = {
    llmProviders: LLMStatus[];
    database: DatabaseStatus | null;
    ollama: OllamaStatus | null;
    migration: MigrationStatus | null;
};

export type FeatureFlag = {
    name: string;
    enabled: boolean;
};

export type CreateFeedback = {
    answer: string;
    isPositive: boolean;
    conversationId: UUID | string;
};

export type Feedback = {
    id: number;
    answer: string;
    isPositive: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export type ConversationHeader = {
    id: UUID;
    title: string;
    createdAt: string;
    updatedAt: string;
};

export type DbConversationHeader = ConversationHeader & {
    teamId: number;
};

export enum Role {
    user = 'user',
    assistant = 'assistant',
}

export type UserMessage = { type: 'user'; input: string };

export type ToolCall = {
    type: 'tool';
    name: string;
    input: string;
};

export type OutputType = {
    type: 'output';
    output: string;
    isAnswer?: boolean;
    positiveCheck: PositiveCheck | null;
};

export type StatusUpdate = {
    type: 'status';
    content: string;
    name: string;
    progress: number;
};

export type Conversation = {
    id: UUID;
    headerId: UUID;
    role: Role;
    content: Array<OutputType | StatusUpdate | ToolCall>;
    createdAt: Date;
    updatedAt: Date;
};

export type PositiveCheck = {
    conversationId: UUID;
    positive: boolean | null;
    answer: string;
};

export type JobTypeStats = {
    count: number;
    uniqueCustomers: number;
    uniqueTeams: number;
    avgProcessingTime: number;
    statusBreakdown: {
        picked: number;
        pending: number;
        failed: number;
        completed: number;
    };
};

export type JobQueueSummary = {
    totalJobs: number;
    uniqueJobTypes: number;
    statusCounts: {
        picked: number;
    };
    jobTypesOverview: {
        [key: string]: number;
    };
};

export type JobQueueStats = {
    summary: JobQueueSummary;
    jobTypeStats: {
        [key: string]: JobTypeStats;
    };
};

export type DocumentTable = {
    rows: {
        documentId: number;
        cols: { [key: string]: any };
        meta: { [key: string]: any };
    }[];
    filled: number; // ranges from 0.0 to 1.0
};

export type SerializedPolarsDF = {
    schema: {
        name: string;
        dataType: string;
    }[];
    data: Array<Record<string, any>>;
};

export type DomainKnowledge = {
    id: number;
    content: string;
};

export type Example = {
    type: InformationType;
    context: string;
    value: string;
    hint: string | null;
};

export type DbExample = Example & {
    id: number;
    teamId: number;
};

export enum InformationType {
    revision = 'revision',
    sb_number = 'sb_number',
    ata_chapter = 'ata_chapter',
    category = 'category',
}

export type Pattern = {
    type: string;
    value: string;
    createdAt: string;
};

export type DbPattern = Pattern & {
    id: number;
    teamId: number;
};

export type DocumentStats = Document & {
    chapterCount: number;
};

export type MultipartUploadPart = {
    ETag: string;
    PartNumber: number;
};

export type UploadProgress = {
    indexingCount: number;
    total: number;
    progress: number;
};

export type WorkOrder = {
    workOrderNo: string;
    taskNo: string;
    aircraftModel: string;
    description: string;
    snLoc: string | null;
    issuedDate: string;
    scheduledFrom: string;
    scheduledTo: string;
    implementationDate: string;
    implementationResult: string;
    remarks: string | null;
    manLabor: number;
    actualManLabor: number;
};
