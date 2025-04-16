import { baseUrl } from '@/lib/config';

import useApiKey from '@/hooks/useApiKey';

export const usePDFLink = (id: string | number, page: number = 1) => {
    const [apiKey, _] = useApiKey();

    return `${baseUrl}/api/preview/document/${id}?page=${page}&api_key=${apiKey}#page=${page}`;
};

export const usePDFLinkForFile = (id: string | number, page: number = 1) => {
    const [apiKey, _] = useApiKey();

    return `${baseUrl}/api/preview/file/${id}?page=${page}&api_key=${apiKey}#page=${page}`;
}
