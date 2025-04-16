'use client';

import { useCallback, useState } from 'react';

import { DBFile, FileType } from '@/features/file-overview/types';
import {
    keepPreviousData,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import axios, { AxiosError, isAxiosError } from 'axios';
import { UUID } from 'crypto';
import { toast } from 'sonner';

import useApiKey from '@/hooks/useApiKey';

import { toCamelCase, toSnakeCase } from './case';
import { baseUrl } from './config';
import {
    AdvisorySource,
    CommitInfo,
    Conversation,
    CreateAdvisorySource,
    CreateFeedback,
    DbAdvisory,
    DbAdvisorySource,
    DbConversationHeader,
    DbExample,
    DbPattern,
    DbScraperLog,
    Document,
    DocumentStats,
    DomainKnowledge,
    Example,
    FeatureFlag,
    Hyperlink,
    Image,
    JobQueueStats,
    MultipartUploadPart,
    OllamaModel,
    RAGModel,
    RAGSource,
    ScraperStatus,
    SystemStatus,
    Table,
    UploadProgress,
    WorkOrder,
} from './types';

type Pagination = {
    limit: number;
    skip: number;
};

type PaginatedResponse<t> = {
    total: number;
    results: t[];
};

function handleError(err: AxiosError | unknown) {
    if (isAxiosError(err) && err.response) {
        if ((err as AxiosError)?.response?.status === 403) {
            toast.error('Invalid API key');
        } else {
            toast.error(`An error occured while searching files: ${err}`);
        }
    }
}

type DocumentId = { documentId: string | number };
export type Id = { id: string | number };

export async function uploadFiles(props: {
    apiKey: string;
    files: File[];
    [key: string]: any;
}) {
    const { apiKey, files, ...rest } = props;
    const headers = {
        'X-API-KEY': apiKey,
        'Content-Type': 'multipart/form-data',
    };

    const chunkSize = 1 * 1024 * 1024; // 1MB chunks

    for (const file of files) {
        const totalChunks = Math.ceil(file.size / chunkSize);

        for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
            const start = chunkIndex * chunkSize;
            const end = Math.min(start + chunkSize, file.size);
            const chunk = file.slice(start, end);

            const formData = new FormData();
            formData.append('file', chunk, file.name);
            formData.append('chunkIndex', chunkIndex.toString());
            formData.append('totalChunks', totalChunks.toString());

            for (const [key, value] of Object.entries(rest)) {
                formData.append(key, value);
            }

            try {
                await axios.post(`${baseUrl}/api/search/upload`, formData, {
                    headers,
                });

                // Update progress if needed
                const progress = ((chunkIndex + 1) / totalChunks) * 100;
                console.log(
                    `Upload progress for ${file.name}: ${progress.toFixed(2)}%`,
                );
            } catch (err) {
                handleError(err);
                return; // Exit the function if an error occurs
            }
        }
    }

    toast.success('Files uploaded successfully');
}

export async function initiateMultipartUpload(props: {
    apiKey: string;
    filename: string;
    fileSize: number;
    contentType: string;
    fileType: FileType;
}): Promise<DBFile> {
    const headers = { 'X-API-KEY': props.apiKey };
    const request = {
        content_type: props.contentType,
        file_name: props.filename,
        file_size: props.fileSize,
        file_type: props.fileType,
    };
    const response = await axios.post(
        `${baseUrl}/api/files/initiate_upload/`,
        request,
        { headers },
    );
    return toCamelCase(response.data);
}

export async function generatePartUrl(props: {
    apiKey: string;
    objectKey: string;
    partNumber: number;
}): Promise<string> {
    const headers = { 'X-API-KEY': props.apiKey };
    const request = {
        objectKey: props.objectKey,
        partNumber: props.partNumber,
    };
    const response = await axios.post<{ url: string }>(
        `${baseUrl}/api/files/generate_part_url/`,
        toSnakeCase(request),
        { headers },
    );
    return response.data.url;
}

export async function completeMultipartUpload(props: {
    apiKey: string;
    objectKey: string;
    parts: MultipartUploadPart[];
}) {
    const headers = { 'X-API-KEY': props.apiKey };
    const request = {
        object_key: props.objectKey,
        parts: props.parts,
    };
    await axios.post(`${baseUrl}/api/files/complete_upload/`, request, {
        headers,
    });
}

export async function rag(props: {
    apiKey: string;
    query: string;
    model?: string;
    [key: string]: any;
}) {
    const { apiKey, query, model, ...rest } = props;
    const headers = { 'X-API-KEY': apiKey };

    try {
        const response = await axios.post(
            `${baseUrl}/api/search/rag`,
            { query, model },
            { headers, params: rest },
        );
        return toCamelCase<{ response: string; sources: RAGSource[] }>(
            response.data,
        );
    } catch (err) {
        handleError(err);
    }
}

export async function ragModels(props: { apiKey: string; [key: string]: any }) {
    const { apiKey, ...rest } = props;
    const headers = { 'X-API-KEY': apiKey };

    try {
        return [] as RAGModel[];
    } catch (err) {
        handleError(err);
    }
}

export const useCreateFeedback = () => {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (feedback: CreateFeedback) => {
            let res = await axios.post(
                `${baseUrl}/api/conversation/feedbacks`,
                toSnakeCase(feedback),
                { headers },
            );
        },
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['sources'] }),
    });
};

export const useRagModels = () => {
    const [apiKey, _] = useApiKey();
    return useQuery({
        queryKey: ['ragModels'],
        queryFn: async () => ragModels({ apiKey }),
        enabled: !!apiKey,
    });
};

export function getImageLink(props: { apiKey: string; imageId: number }) {
    const { apiKey, imageId } = props;
    return `${baseUrl}/api/preview/images/${imageId}?api_key=${apiKey}`;
}

export function useDocuments(
    id: number | null = null,
    page: number = 1,
    limit: number = 10,
    filename: string | null = null,
    sort: string | null = null,
) {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useQuery({
        queryKey: ['documents', id, page, filename],
        queryFn: async () => {
            let res = await axios.get(`${baseUrl}/api/search/documents`, {
                params: { id, page, limit, filename, sort },
                headers,
            });
            return toCamelCase<Document[]>(res.data);
        },
        refetchInterval: 3000,
        enabled: !!apiKey,
    });
}

export function useDocument(id: number | string) {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useQuery({
        queryKey: ['document', id],
        queryFn: async () => {
            let res = await axios.get(`${baseUrl}/api/search/document/${id}`, {
                headers,
            });
            return toCamelCase<Document>(res.data);
        },
        enabled: !!apiKey,
    });
}

export function useDocumentPages(filename: string | null = null) {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useQuery({
        queryKey: ['document_page'],
        queryFn: async () => {
            let res = await axios.get(`${baseUrl}/api/search/document_page`, {
                params: { filename },
                headers,
            });
            return res.data as number;
        },
        enabled: !!apiKey,
        refetchInterval: 3000,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    });
}

export function useDocumentTables(id: number) {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useQuery({
        queryKey: ['document_tables'],
        queryFn: async () => {
            let res = await axios.get(`${baseUrl}/api/search/document_tables`, {
                params: { document_id: id },
                headers,
            });
            return toCamelCase<Table[]>(res.data);
        },
        enabled: !!apiKey,
        refetchInterval: 3000,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    });
}

export function useDocumentImages(id: number) {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useQuery({
        queryKey: ['document_images'],
        queryFn: async () => {
            let res = await axios.get(`${baseUrl}/api/search/document_images`, {
                params: { document_id: id },
                headers,
            });
            return toCamelCase<Image[]>(res.data);
        },
        enabled: !!apiKey,
        refetchInterval: 3000,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    });
}

export function useDocumentHyperlink(id: number) {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useQuery({
        queryKey: ['document_hyperlinks'],
        queryFn: async () => {
            let res = await axios.get(
                `${baseUrl}/api/search/document_hyperlinks`,
                {
                    params: { document_id: id },
                    headers,
                },
            );
            return toCamelCase<Hyperlink[]>(res.data);
        },
        enabled: !!apiKey,
        refetchInterval: 3000,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    });
}

export function useDeleteDocument() {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ documentId }: DocumentId) => {
            await axios.delete(
                `${baseUrl}/api/search/documents/${documentId}`,
                {
                    headers,
                },
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['documents'] });
            queryClient.invalidateQueries({ queryKey: ['documentsWithStats'] });
            queryClient.invalidateQueries({ queryKey: ['progress'] });
        },
    });
}

export const useSources = (id: number | null = null) => {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useQuery({
        queryKey: ['sources'],
        queryFn: async () => {
            let res = await axios.get(`${baseUrl}/api/compliance/sources`, {
                params: { id: id },
                headers,
            });
            return toCamelCase<DbAdvisorySource[]>(res.data);
        },
        enabled: !!apiKey,
        refetchOnMount: true,
    });
};

export const useCreateSource = () => {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (source: CreateAdvisorySource) => {
            let res = await axios.post(
                `${baseUrl}/api/compliance/sources`,
                toSnakeCase({
                    ...source,
                    max_age: source.maxAge.toISOString(),
                }),
                { headers },
            );
            return toCamelCase<DbAdvisorySource>(res.data);
        },
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['sources'] }),
    });
};

export const useDeleteSource = () => {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (sourceId: number | string) => {
            let res = await axios.delete(
                `${baseUrl}/api/compliance/sources/${sourceId}`,
                { headers },
            );
            return toCamelCase<DbAdvisorySource>(res.data);
        },
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['sources'] }),
    });
};

export const useUpdateSource = () => {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: { source: AdvisorySource }) => {
            let res = await axios.put(
                `${baseUrl}/api/compliance/sources`,
                body,
                {
                    headers,
                },
            );
            return toCamelCase<DbAdvisorySource>(res.data);
        },
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['sources'] }),
    });
};

export const useAdvisories = (pagination: { limit: number; skip: number }) => {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useQuery({
        queryKey: ['advisories', pagination.limit, pagination.skip],
        queryFn: async () => {
            let res = await axios.get(`${baseUrl}/api/compliance/advisories`, {
                headers,
                params: pagination,
            });
            return toCamelCase<{ total: number; results: DbAdvisory[] }>(
                res.data,
            );
        },
        enabled: !!apiKey,
        placeholderData: keepPreviousData,
    });
};

export const useDetailAdvisory = (advisory_id: number) => {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useQuery({
        queryKey: ['detail_advisory'],
        queryFn: async () => {
            let res = await axios.get(
                `${baseUrl}/api/compliance/detail_advisory`,
                {
                    headers,
                    params: { advisory_id },
                },
            );
            return toCamelCase<DbAdvisory>(res.data);
        },
        refetchInterval: 3000,
        enabled: !!apiKey,
    });
};

export const useScraperLog = () => {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useQuery({
        queryKey: ['scraper_log'],
        queryFn: async () => {
            let res = await axios.get(`${baseUrl}/api/compliance/scraper_log`, {
                headers,
            });
            return toCamelCase<DbScraperLog>(res.data);
        },
        enabled: !!apiKey,
        placeholderData: keepPreviousData,
    });
};

export const useUpdateScraperLog = () => {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (status: ScraperStatus) => {
            let res = await axios.put(
                `${baseUrl}/api/compliance/scraper_log`,
                { status: status },
                { headers },
            );
            return toCamelCase<DbScraperLog>(res.data);
        },
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['sources'] }),
    });
};

export const useCommitInfo = () => {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useQuery({
        queryKey: ['commit-info'],
        queryFn: async () => {
            const mockCommitInfo: CommitInfo = {
                commitSha: 'd4f7e9c2a5b8f9132e6a7c1e2f9b12345678abcd',
                commitMessage: 'Fix document parsing bug in compliance handler',
                commitDate: '2025-04-15T17:42:10Z',
              };
              
            return mockCommitInfo;
        },
        enabled: !!apiKey,
    });
};

export const useOllamaStatus = () => {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useQuery({
        queryKey: ['ollama-status'],
        queryFn: async () => {
            let res = await axios.get(`${baseUrl}/api/ollama/status`, {
                headers,
            });
            return res.data as string;
        },
        enabled: !!apiKey,
    });
};

export const useOllamaModels = () => {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useQuery({
        queryKey: ['ollama-models'],
        queryFn: async () => {
            let res = await axios.get(`${baseUrl}/api/ollama/models`, {
                headers,
            });
            return toCamelCase<OllamaModel[]>(res.data);
        },
        enabled: !!apiKey,
    });
};

export const healthCheck = async (): Promise<SystemStatus> => {
    let res = await axios.get(`${baseUrl}/healthcheck`);
    return toCamelCase<SystemStatus>(res.data);
};

export const useHealthCheck = () => {
    return useQuery({
        queryKey: ['healthCheck'],
        queryFn: healthCheck,
    });
};

export const ping = async (): Promise<'pong' | undefined> => {
    try {
        let res = await axios.get(`${baseUrl}/ping`);
        return res.data;
    } catch (error) {
        console.error(`Health check failed`);
        return undefined;
    }
};




export const useFlags = () => {
    return useQuery({
        queryKey: ['feature-flags'],
        queryFn: async (): Promise<FeatureFlag[]> => {
            return [
                { name: 'example_learning', enabled: true },
                { name: 'end_of_lease', enabled: true },
                { name: 'file_system', enabled: true },
                { name: 'maintenance_agent', enabled: true },
            ];
        },
    });
};

export const useFlag = (flag: string) => {
    return useQuery<boolean, Error>({
        queryKey: ['feature-flags', flag],
        queryFn: async () => {
            return true;
        },
        refetchInterval: 10000,
        staleTime: 5000,
        retry: 1,
    });
};

export const useToggleFlag = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (flag: string) => {
            await axios.post(`${baseUrl}/api/flags/${flag}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['feature-flags'] });
        },
    });
};

export const useDeleteFlag = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (flag: string) => {
            await axios.delete(`${baseUrl}/api/flags/${flag}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['feature-flags'] });
        },
    });
};

export const useConversationHeaders = ({
    query,
    limit = 10,
    skip = 0,
}: {
    query?: string;
    limit: number;
    skip: number;
}) => {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useQuery({
        queryKey: ['conversation_headers', query, limit, skip],
        queryFn: async () => {
            let res = await axios.get(`${baseUrl}/api/conversation/headers`, {
                headers,
                params: { query, limit, skip },
            });
            return toCamelCase<DbConversationHeader[]>(res.data);
        },
        enabled: !!apiKey,
        refetchInterval: 3000,
    });
};

export const useConversationHistory = (header_id: UUID | null) => {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useQuery({
        queryKey: ['conversation_history'],
        queryFn: async () => {
            let res = await axios.get(`${baseUrl}/api/conversation/history`, {
                headers,
                params: { header_id },
            });
            return toCamelCase<Conversation[]>(res.data);
        },
        enabled: !!apiKey && header_id !== null,
        refetchInterval: 3000,
    });
};

export const useDownloadConversations = () => {
    const [apiKey] = useApiKey();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const downloadConversations = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const headers = { 'X-API-KEY': apiKey };
            const response = await axios.post(
                `${baseUrl}/api/conversation/download`,
                {},
                { headers, responseType: 'blob' },
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'conversations.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Download failed'));
            console.error('Conversation download error:', err);
        } finally {
            setIsLoading(false);
        }
    }, [apiKey]);

    return {
        downloadConversations,
        isLoading,
        error,
    };
};

export const useRerunExtraction = () => {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            await axios.post(
                `${baseUrl}/api/search/rerun_extraction`,
                {},
                { headers },
            );
        },
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['sources'] }),
    });
};

export function useRecentUserQuestions() {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useQuery({
        queryKey: ['recent_user_questions'],
        queryFn: async () => {
            let res = await axios.get(`${baseUrl}/api/conversation/recent`, {
                headers,
            });
            return toCamelCase<string[]>(res.data);
        },
        enabled: !!apiKey,
        refetchInterval: 8000,
    });
}

export const useJobQueue = () => {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useQuery({
        queryKey: ['job-queue'],
        queryFn: async () => {
            const res = await axios.get(`${baseUrl}/api/admin/job-queue`, {
                headers,
            });
            return toCamelCase<JobQueueStats>(res.data);
        },
        enabled: !!apiKey,
        refetchInterval: 2000,
    });
};

export async function reparseDocuments(props: { apiKey: string }) {
    const { apiKey } = props;
    const headers = { 'X-API-KEY': apiKey };

    try {
        const response = await axios.post(
            `${baseUrl}/api/parser/reparse-documents`,
            {},
            { headers },
        );
        return toCamelCase<{ response: string }>(response.data);
    } catch (err) {
        handleError(err);
    }
}

export const useReparseDocuments = () => {
    const [apiKey, _] = useApiKey();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => await reparseDocuments({ apiKey }),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['progress'] }),
    });
};

export function useDeleteAllDocuments() {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            await axios.delete(`${baseUrl}/api/search/documents`, { headers });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['documents'] });
            queryClient.invalidateQueries({ queryKey: ['documentsWithStats'] });
            queryClient.invalidateQueries({ queryKey: ['progress'] });
        },
    });
}

export function useProgress() {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useQuery({
        queryKey: ['progress'],
        queryFn: async () => {
            let res = await axios.get(`${baseUrl}/api/parser/progress`, {
                headers,
            });
            return toCamelCase<UploadProgress>(res.data);
        },
        enabled: !!apiKey,
        refetchInterval: 3000,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    });
}

export const useDomainKnowledge = ({
    limit,
    skip,
    query = null,
}: Pagination & { query: string | null }) => {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useQuery({
        queryKey: ['domainKnowledge', { limit, skip, query }],
        queryFn: async () => {
            let res = await axios.get(`${baseUrl}/api/domain-facts/`, {
                headers,
                params: { limit, skip, query },
            });
            return toCamelCase<PaginatedResponse<DomainKnowledge>>(res.data);
        },
        enabled: !!apiKey,
        refetchInterval: 10000,
        refetchOnMount: true,
    });
};

export const useCreateDomainKnowledge = () => {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (content: string) => {
            await axios.post(
                `${baseUrl}/api/domain-facts/`,
                { content },
                {
                    headers,
                },
            );
        },
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['domainKnowledge'] }),
    });
};

export async function uploadDomainKnowledgeFiles(props: {
    apiKey: string;
    files: File[];
    [key: string]: any;
}) {
    const { apiKey, files, ...rest } = props;
    const headers = { 'X-API-KEY': apiKey };

    for (const file of files) {
        const formData = new FormData();
        formData.append('file', file, file.name);

        for (const [key, value] of Object.entries(rest)) {
            formData.append(key, value);
        }

        try {
            await axios.post(`${baseUrl}/api/domain-facts/upload`, formData, {
                headers: {
                    ...headers,
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (err) {
            handleError(err);
            return; // Exit the function if an error occurs
        }
    }
}

export const useUpdateDomainKnowledge = () => {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (fact: DomainKnowledge) => {
            await axios.put(`${baseUrl}/api/domain-facts/${fact.id}`, fact, {
                headers,
            });
        },
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['domainKnowledge'] }),
    });
};

export const useDeleteDomainKnowledge = () => {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (fact: DomainKnowledge) => {
            await axios.delete(`${baseUrl}/api/domain-facts/${fact.id}`, {
                headers,
            });
        },
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['domainKnowledge'] }),
    });
};

export const useExamples = () => {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useQuery({
        queryKey: ['example'],
        queryFn: async () => {
            let res = await axios.get(`${baseUrl}/api/examples/`, {
                headers,
            });
            return toCamelCase<DbExample[]>(res.data);
        },
        enabled: !!apiKey,
        refetchInterval: 3000,
        refetchOnMount: true,
    });
};

export const useCreateExample = () => {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useMutation({
        mutationFn: async (example: Example) => {
            let res = await axios.post(
                `${baseUrl}/api/examples/`,
                toSnakeCase(example),
                { headers },
            );
            return toCamelCase<DbExample>(res.data);
        },
    });
};

export const useDeleteExample = () => {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useMutation({
        mutationFn: async (sourceId: number | string) => {
            let res = await axios.delete(
                `${baseUrl}/api/examples/${sourceId}`,
                { headers },
            );
        },
    });
};

export const usePatterns = () => {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useQuery({
        queryKey: ['pattern'],
        queryFn: async () => {
            let res = await axios.get(`${baseUrl}/api/patterns/`, {
                headers,
            });
            return toCamelCase<DbPattern[]>(res.data);
        },
        enabled: !!apiKey,
        refetchInterval: 3000,
        refetchOnMount: true,
    });
};

export const useGenerateNewPattern = () => {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useMutation({
        mutationFn: async () => {
            await axios.post(`${baseUrl}/api/patterns/`, {}, { headers });
        },
    });
};

export const useDeletePattern = () => {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useMutation({
        mutationFn: async (sourceId: number | string) => {
            let res = await axios.delete(
                `${baseUrl}/api/patterns/${sourceId}`,
                { headers },
            );
        },
    });
};

export const listDocumentsWithStats = async (
    apiKey: string,
    skip: number,
    limit: number,
) => {
    const headers = { 'X-API-KEY': apiKey };
    const res = await axios.get(`${baseUrl}/api/search/document-stats`, {
        headers,
        params: { skip, limit },
    });
    return toCamelCase<PaginatedResponse<DocumentStats>>(res.data);
};

export const useDocumentsWithStats = ({ limit, skip }: Pagination) => {
    const [apiKey, _] = useApiKey();

    return useQuery({
        queryKey: ['documentsWithStats', skip, limit],
        queryFn: async () => await listDocumentsWithStats(apiKey, skip, limit),
        enabled: !!apiKey,
    });
};

export function useDocumentWithStats(id: number | string) {
    const [apiKey, _] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useQuery({
        queryKey: ['document-with-stats', id],
        queryFn: async () => {
            const res = await axios.get(
                `${baseUrl}/api/search/document-stats/${id}`,
                { headers },
            );
            return toCamelCase<DocumentStats>(res.data);
        },
        enabled: !!apiKey,
    });
}

export async function uploadFilesV2(props: {
    apiKey: string;
    files: File[];
    [key: string]: any;
}) {
    const { apiKey, files, ...rest } = props;
    const headers = { 'X-API-KEY': apiKey };

    const chunkSize = 1 * 1024 * 1024; // 1MB chunks

    for (const file of files) {
        const totalChunks = Math.ceil(file.size / chunkSize);

        for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
            const start = chunkIndex * chunkSize;
            const end = Math.min(start + chunkSize, file.size);
            const chunk = file.slice(start, end);

            const formData = new FormData();
            formData.append('file', chunk, file.name);
            formData.append('chunkIndex', chunkIndex.toString());
            formData.append('totalChunks', totalChunks.toString());

            for (const [key, value] of Object.entries(rest)) {
                formData.append(key, value);
            }

            try {
                await axios.post(`${baseUrl}/api/files/upload`, formData, {
                    headers: {
                        ...headers,
                        'Content-Type': 'multipart/form-data',
                    },
                });

                // Update progress if needed
                const progress = ((chunkIndex + 1) / totalChunks) * 100;
                console.log(
                    `Upload progress for ${file.name}: ${progress.toFixed(2)}%`,
                );
            } catch (err) {
                handleError(err);
                return; // Exit the function if an error occurs
            }
        }
    }

    toast.success('Files uploaded successfully');
}

export async function scanWorkOrder(apiKey: string, file: any) {
    const headers = {
        'X-API-KEY': apiKey,
        'Content-Type': 'multipart/form-data',
    };
    const formData = new FormData();
    formData.append('file', file);

    const res = await axios.post(`${baseUrl}/api/files/scan`, formData, {
        headers,
    });

    return toCamelCase<WorkOrder>(res.data);
}
