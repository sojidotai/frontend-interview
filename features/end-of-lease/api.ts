'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { toCamelCase, toSnakeCase } from '@/lib/case';
import { baseUrl } from '@/lib/config';
import { MultipartUploadPart } from '@/lib/types';

import useApiKey from '@/hooks/useApiKey';

import {
    Activity,
    AviationDocument,
    AviationDocumentType,
    DocumentStatus,
    LeasingAircraft,
    LeasingDocument,
    LeasingProject,
    ProjectStatus,
    Stats,
} from './types';

type Pagination = {
    limit: number;
    skip: number;
};

type ProjectId = { projectId: number };

type PaginatedResponse<t> = {
    total: number;
    results: t[];
};

export const useDocuments = ({
    projectId,
    type,
    ids,
    limit,
    skip,
    matched,
}: Pagination &
    ProjectId & {
        ids?: number[];
        type?: AviationDocumentType;
        matched?: boolean;
    }) => {
    const [apiKey] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useQuery({
        queryKey: ['leasingDocuments', { projectId, limit, skip, ids, matched }],
        queryFn: async () => {
            let res = await axios.get(`${baseUrl}/api/leasing/`, {
                headers,
                params: { project_id: projectId, ids, type, matched, limit, skip },
                paramsSerializer: { indexes: null },
            });
            return toCamelCase<PaginatedResponse<LeasingDocument>>(res.data);
        },
        enabled: !!apiKey,
        refetchInterval: 3000,
        refetchOnMount: true,
    });
};

// POST /api/leasing/
export const useCreateLeasingDocument = () => {
    const [apiKey] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            request: ProjectId & { fileId: number },
        ) => {
            const response = await axios.post(
                `${baseUrl}/api/leasing/`,
                toSnakeCase(request),
                { headers },
            );
            return toCamelCase<LeasingDocument>(response.data);
        },
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ['leasingDocuments'],
            }),
    });
};

export interface ProjectCreate {
    aircraft: LeasingAircraft;
    title: string;
}

// GET /api/leasing/projects
export const useProjects = () => {
    const [apiKey] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useQuery({
        queryKey: ['leasingProjects'],
        queryFn: async () => {
            const response = await axios.get(
                `${baseUrl}/api/leasing/projects`,
                { headers },
            );
            return toCamelCase<LeasingProject[]>(response.data);
        },
        enabled: !!apiKey,
        refetchOnWindowFocus: true,
    });
};

// DELETE /api/leasing/projects/{id}
export const useDeleteProject = () => {
    const [apiKey] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            await axios.delete(`${baseUrl}/api/leasing/projects/${id}`, {
                headers,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['leasingProjects'] });
        },
    });
};

// POST /api/leasing/projects
export const useCreateProject = () => {
    const [apiKey] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (project: ProjectCreate) => {
            const response = await axios.post(
                `${baseUrl}/api/leasing/projects`,
                toSnakeCase(project),
                { headers },
            );
            return toCamelCase<LeasingProject>(response.data);
        },
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['leasingProjects'] }),
    });
};

// DELETE /api/leasing/{id}
export const useDeleteDocument = () => {
    const [apiKey] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            await axios.delete(`${baseUrl}/api/leasing/${id}`, {
                headers,
                params: { document_id: id },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['leasingDocuments'] });
        },
    });
};

// GET /api/leasing/preview/{id}
// Uses the file id
export const usePreview = (id: number) => {
    const [apiKey] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useQuery({
        queryKey: ['preview', id],
        queryFn: async () => {
            let res = await axios.get(`${baseUrl}/api/leasing/preview/${id}`, {
                headers,
            });
            return res.data as string;
        },
        enabled: !!apiKey,
    });
};

// POST /api/leasing/projects/{id}/status
export const useUpdateProjectStatus = () => {
    const [apiKey] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            projectId,
            status,
        }: {
            projectId: number;
            status: ProjectStatus;
        }) => {
            await axios.post(
                `${baseUrl}/api/leasing/projects/${projectId}/status`,
                { status },
                { headers },
            );
        },
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['leasingProjects'] }),
    });
};

// GET /api/leasing/projects/{id}/stats
export const useProjectStats = (id: number) => {
    const [apiKey] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useQuery({
        queryKey: ['leasingProjectsStats', id],
        queryFn: async () => {
            const response = await axios.get(
                `${baseUrl}/api/leasing/projects/${id}/stats`,
                { headers },
            );
            return toCamelCase<Stats[]>(response.data);
        },
        enabled: !!apiKey,
    });
};

// GET /api/leasing/{id}
export const useDocument = (id: number) => {
    const [apiKey] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useQuery({
        queryKey: ['leasingDocument', id],
        queryFn: async () => {
            let res = await axios.get(`${baseUrl}/api/leasing/${id}`, {
                headers,
            });
            return toCamelCase<LeasingDocument>(res.data);
        },
        enabled: !!apiKey,
    });
};

export const useUpdateDocumentStatus = (id: number) => {
    const [apiKey] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ status }: { status: DocumentStatus }) => {
            await axios.post(
                `${baseUrl}/api/leasing/${id}/status`,
                { status },
                { headers },
            );
        },
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ['leasingDocument', id],
            }),
    });
};

// GET /api/leasing/{project_id}/activities
export const useActivities = (projectId: number) => {
    const [apiKey] = useApiKey();
    const headers = { 'X-API-KEY': apiKey };

    return useQuery({
        queryKey: ['leasingActivities', projectId],
        queryFn: async () => {
            let res = await axios.get(
                `${baseUrl}/api/leasing/${projectId}/activities`,
                {
                    headers,
                },
            );
            return toCamelCase<Activity[]>(res.data);
        },
        enabled: !!apiKey,
    });
};
