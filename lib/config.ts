'use client';

if (!process.env.NEXT_PUBLIC_BASE_URL) {
    console.warn(
        'NEXT_PUBLIC_BASE_URL is not set, using current host',
    );
}

const getBaseHostname = (): string => {
    if (typeof window !== 'undefined') {
        return window.location.hostname;
    }
    return 'localhost';
};

// Construct the full domain with appropriate port
export const baseDomain = (() => {
    const configuredUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (configuredUrl) {
        return configuredUrl.trim();
    }

    return getBaseHostname();
})();

export const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || '').trim();

const isSojiAIAddress =
    baseDomain.includes('localhost') || baseDomain.includes('.soji.ai');
export const enableLangfuse = isSojiAIAddress;
export const langfuseLink =
    'https://langfuse.soji.ai/project/clzr4rej000rz14777ml93xb4/traces?dateRange=30+min';
