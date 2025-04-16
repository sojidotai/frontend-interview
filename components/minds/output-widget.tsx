import { useState } from 'react';
import Markdown from 'react-markdown';

import { motion } from 'framer-motion';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import remarkGfm from 'remark-gfm';
import { toast } from 'sonner';

import { useCreateFeedback } from '@/lib/api';

import { AgentOutput } from '@/hooks/useMindsChat';

import { Card } from '@/components/ui/card';

import PDFQuote from './pdf-quote';
import TableQuote from './table-quote';

type OutputWidgetProps = {
    output: AgentOutput;
    conversationId?: string;
};

const bubbleVariants = {
    initial: {
        opacity: 0,
        scale: 0.6,
        y: 20,
    },
    animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 24,
        },
    },
};

export default function OutputWidget({
    output,
    conversationId: conversationID,
}: OutputWidgetProps) {
    const { content, quotes } = output.value;
    const [feedbackGiven, setFeedbackGiven] = useState(false);
    const createFeedback = useCreateFeedback();

    const handleFeedback = async (isPositive: boolean) => {
        toast.promise(
            createFeedback
                .mutateAsync({
                    answer: output.value.content,
                    isPositive,
                    conversationId: conversationID || 'null',
                })
                .then(() => setFeedbackGiven(true)),
            {
                loading: 'Recording feedback',
                success: 'Feedback recorded',
            },
        );
    };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={bubbleVariants}
            className="relative"
        >
            <Card className="px-3 py-2 mb-8 rounded-bl-none outline outline-1 outline-zinc-200">
                <div className="leading-relaxed prose space-y-0">
                    <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
                </div>
                {quotes && quotes.length > 0 && (
                    <div className="mt-4 space-y-2">
                        {quotes.map(
                            (q) =>
                                q.chapter && (
                                    <PDFQuote
                                        key={q.chapter.id}
                                        chapter={q.chapter}
                                        relevantPart={q.quote}
                                    />
                                ),
                        )}
                        {quotes.map(
                            (q, i) =>
                                q.table && (
                                    <TableQuote key={i} table={q.table} />
                                ),
                        )}
                    </div>
                )}
            </Card>

            {conversationID && !feedbackGiven && (
                <div className="absolute bottom-0 right-0 transform translate-y-3/4 flex gap-2 bg-white rounded-full px-3 py-1 border border-zinc-200">
                    <button
                        onClick={() => handleFeedback(true)}
                        className="text-zinc-500 hover:text-green-500 transition-colors"
                        aria-label="Thumbs up"
                    >
                        <ThumbsUp size={16} />
                    </button>
                    <div className="w-px h-full bg-zinc-200" />
                    <button
                        onClick={() => handleFeedback(false)}
                        className="text-zinc-500 hover:text-red-500 transition-colors"
                        aria-label="Thumbs down"
                    >
                        <ThumbsDown size={16} />
                    </button>
                </div>
            )}
        </motion.div>
    );
}
