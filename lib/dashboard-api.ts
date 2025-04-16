'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import useApiKey from '@/hooks/useApiKey';

import { toCamelCase } from './case';
import { baseUrl } from './config';

export type ATAChapter = {
    ataChapter: string;
    ataChapterTitle: string | null;
    documentCount: number;
    affectedEngineModels: number;
};

export function useTopATAChapters() {
    const [apiKey, _] = useApiKey();
    const config = { headers: { 'X-API-KEY': apiKey } };

    return useQuery({
        queryKey: ['top-ata-chapters'],
        queryFn: async () => {
            let res = await axios.get(
                `${baseUrl}/api/dashboard/top-ata-chapters`,
                config,
            );
            return toCamelCase<ATAChapter[]>(res.data);
        },
        enabled: !!apiKey,
    });
}

export type RecentSB = {
    engineModel: string;
    sbCount: number;
    earliestSb: string;
    latestSb: string;
    recentSbs: number;
};

export function useRecentSBs() {
    const [apiKey, _] = useApiKey();
    const config = { headers: { 'X-API-KEY': apiKey } };

    return useQuery({
        queryKey: ['recent-sbs'],
        queryFn: async () => {
            let res = await axios.get(
                `${baseUrl}/api/dashboard/recent-sbs`,
                config,
            );
            return toCamelCase<RecentSB[]>(res.data);
        },
        enabled: !!apiKey,
    });
}
export type RevisionStat = {
    engineModel: string;
    totalDocs: number;
    avgRevisionNumber: number;
    frequentlyUpdatedDocs: number;
};

export function useRevisionStats() {
    const [apiKey, _] = useApiKey();
    const config = { headers: { 'X-API-KEY': apiKey } };

    return useQuery({
        queryKey: ['revision-stats'],
        queryFn: async () => {
            let res = await axios.get(
                `${baseUrl}/api/dashboard/revisions`,
                config,
            );
            return toCamelCase<RevisionStat[]>(res.data);
        },
        enabled: !!apiKey,
    });
}

export type ConversationAnalytics = {
    chatDate: string;
    totalConversations: number;
    userMessages: number;
    assistantResponses: number;
    avgMessageLength: number;
};

export function useConversationAnalytics() {
    const [apiKey, _] = useApiKey();
    const config = { headers: { 'X-API-KEY': apiKey } };

    return useQuery({
        queryKey: ['conversation-analytics'],
        queryFn: async () => {
            let res = await axios.get(
                `${baseUrl}/api/dashboard/conversation-analytics`,
                config,
            );
            return toCamelCase<ConversationAnalytics[]>(res.data);
        },
        enabled: !!apiKey,
    });
}
