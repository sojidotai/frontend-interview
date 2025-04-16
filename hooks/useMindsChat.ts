import { useCallback, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { toast } from 'sonner';

import { useFlag } from '@/lib/api';
import { toCamelCase, toSnakeCase } from '@/lib/case';
import { baseUrl } from '@/lib/config';
import { Chapter, Document, DocumentTable, RAGModel } from '@/lib/types';

import useApiKey from './useApiKey';

export type AgentOutput = {
    type: 'AgentOutput';
    value: {
        content: string;
        quotes: {
            chapter: Chapter | null;
            quote: string;
            table: DocumentTable | null;
        }[];
    };
};

type Step = {
    name: string;
    input: string;
    result: string;
};

export type Memory = {
    type: 'Memory';
    value: {
        activeDocument: Document | null;
        workflowInvocations: Step[];
        domainKnowledge: string | null;
        dynamicExamples: string | null;
        table: DocumentTable;
    };
};

export type Progress = {
    type: 'Progress';
    value: {
        text: string | null;
        percent: number | null;
        table: DocumentTable | null;
    };
};

export type WorkflowStart = {
    type: 'WorkflowStart';
    value: { name: string };
};

export type WorkflowOutput = {
    type: 'WorkflowOutput';
    value: { name: string; output: string };
};

export type UserQuery = {
    type: 'UserQuery';
    value: { query: string };
};

type Header = {
    type: 'Header';
    value: { header: string };
};

type Error = {
    type: 'Error';
    value: { message: string };
};

type Meta = {
    type: 'Meta';
    value: { conversationId: string };
};

type ChatMessage =
    | UserQuery
    | AgentOutput
    | WorkflowStart
    | WorkflowOutput
    | Header
    | Memory
    | Progress
    | Meta
    | Error;

interface SendMessageParams {
    query: string;
}

export const useMindsChat = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [progress, setProgress] = useState<Progress | null>();
    const [meta, setMeta] = useState<{ conversationId: string } | null>();
    const [latestMemory, setLatestMemory] = useState<Memory | null>(null);
    const [apiKey, _] = useApiKey();
    const { data: maintenanceAgent } = useFlag('maintenance_agent');

    const wsUrl = maintenanceAgent
        ? `${baseUrl}/api/maintenance/agent/chat?token=${apiKey}`
        : `${baseUrl}/api/minds/chat?token=${apiKey}`;
    const [isRunning, setIsRunning] = useState(false);

    const { sendJsonMessage, readyState, getWebSocket } = useWebSocket(wsUrl, {
        onMessage: (event) => {
            try {
                const payload = toCamelCase<ChatMessage>(
                    JSON.parse(event.data),
                );

                if (payload.type === 'Error') {
                    toast.error(payload.value.message);
                    return;
                }

                if (payload.type === 'Progress') {
                    setProgress(payload);
                    return;
                }

                if (payload.type === 'Meta') {
                    setMeta(payload.value);
                    return;
                }

                setMessages((prevMessages) => [...prevMessages, payload]);
                if (payload.type === 'AgentOutput') setIsRunning(false);
            } catch (error) {
                console.error('Error parsing websocket message:', error);
            }
        },

        retryOnError: true,
        shouldReconnect: () => true,
        reconnectInterval: 3000,
        reconnectAttempts: 10,
    });

    useEffect(() => {
        setLatestMemory(
            messages.filter((m) => m.type === 'Memory').at(-1) as Memory,
        );
    }, [messages]);

    const reset = () => {
        cancel();
        setMessages([]);
        setProgress(null);
    };

    const updateAIModel = (model: RAGModel) => {
        sendJsonMessage({ model: toSnakeCase(model) });
    };

    const sendMessage = useCallback(
        (params: SendMessageParams) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { type: 'UserQuery', value: { query: params.query } },
            ]);
            setIsRunning(true);
            sendJsonMessage({ query: params.query });
        },
        [sendJsonMessage],
    );

    const cancel = () => {
        sendJsonMessage({ cancel: true });
        setIsRunning(false);
    };

    const resetMemory = () => {
        sendJsonMessage(toSnakeCase({ resetMemory: true }));
        reset();
    };

    return {
        isConnecting: readyState === 0,
        isConnected: readyState === 1,
        isClosing: readyState === 2,
        isClosed: readyState === 3,
        meta,
        progress,
        isRunning,
        messages,
        latestMemory,
        sendMessage,
        getWebSocket,
        updateAIModel,
        reset,
        resetMemory,
        cancel,
    };
};
