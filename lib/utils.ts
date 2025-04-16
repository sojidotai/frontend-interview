import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function range(from: number, n: number, step: number = 1) {
    return Array.from({ length: n }, (_, key) => from + key * step);
}

export function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return (
        Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    );
}

export function formatDate(
    dateString: string | Date | null | undefined,
): string {
    if (dateString instanceof Date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }).format(dateString);
    }

    if (
        !dateString ||
        dateString.includes('yyyy') ||
        dateString.includes('mmm')
    ) {
        return dateString || '-';
    }

    try {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }).format(date);
    } catch (error) {
        return dateString;
    }
}

export function isMarkdownContent(content: string): boolean {
    // Check for common Markdown patterns
    const markdownPatterns = [
        /^#+ /m, // Headers
        /\*\*.+\*\*/, // Bold text
        /\*.+\*/, // Italic text
        /^\s*[-*+] /m, // List items
        /^\s*\d+\. /m, // Numbered lists
        /\[.+\]$$.+$$/, // Links
        /^>/m, // Blockquotes
        /^```/m, // Code blocks
        /^## /m, // ## headers specifically
    ];

    return markdownPatterns.some((pattern) => pattern.test(content));
}
