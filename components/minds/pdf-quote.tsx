import React, { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp, ExternalLink, Quote } from 'lucide-react';

import { baseUrl } from '@/lib/config';
import { Chapter, Chunk } from '@/lib/types';

import useApiKey from '@/hooks/useApiKey';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface QuoteProps {
    chapter: Chapter;
    relevantPart: string;
}

const getPDFUrl = (apiKey: string, documentId: number, page: number) =>
    `${baseUrl}/api/preview/document/${documentId}?api_key=${apiKey}&page=${page}#page=${page}`;

export default function PDFQuote({ chapter, relevantPart }: QuoteProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [apiKey, _] = useApiKey();
    const page = chapter.pageStart || 0;

    const contentVariants = {
        initial: {
            height: 0,
            opacity: 0,
            overflow: 'hidden',
        },
        animate: {
            height: 'auto',
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: 'easeInOut',
            },
        },
        exit: {
            height: 0,
            opacity: 0,
            transition: {
                duration: 0.3,
                ease: 'easeInOut',
            },
        },
    };

    return (
        <Card className="w-full max-w-2xl bg-lime-50">
            <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                    <Quote className="w-6 h-6 text-lime-500 flex-shrink-0 mt-1" />
                    <div className="flex-grow">
                        <p className="text-xs leading-relaxed mb-2 whitespace-pre-wrap">
                            {relevantPart}
                        </p>
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    key="expanded-content"
                                    variants={contentVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                >
                                    <p className="text-xs leading-relaxed mb-2 whitespace-pre-wrap">
                                        {chapter.content}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div className="flex items-center justify-between mt-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-lime-600 hover:text-lime-700 text-sm"
                                onClick={() => setIsExpanded(!isExpanded)}
                            >
                                {isExpanded ? (
                                    <>
                                        <ChevronUp className="w-4 h-4 mr-2" />
                                        Show less
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown className="w-4 h-4 mr-2" />
                                        Show more
                                    </>
                                )}
                            </Button>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-500">
                                    Page {page}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-lime-600 hover:text-lime-700"
                                    onClick={() =>
                                        window.open(
                                            getPDFUrl(
                                                apiKey,
                                                chapter.documentId,
                                                page,
                                            ),
                                            '_blank',
                                        )
                                    }
                                >
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Open PDF
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
