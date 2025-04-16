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
            
const mockLeasingDocuments: LeasingDocument[] = [
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
            return mockLeasingDocuments;
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
