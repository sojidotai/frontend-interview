'use client';

import React, { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface StepProgressProps {
    step: string;
    description?: string;
}

function steps(name: string): string {
    if (name === 'FindCorrectSB') return 'Searching for correct SB';
    if (name === 'FindInActiveSB') return 'Searching in SB';
    if (name === 'MultiDocumentSearch') return 'Finding all relevant SBs';
    if (name === 'CostCalculator') return 'Calculating costs';
    if (name === 'ATAWorkflow') return 'Looking up ATA subchapter';
    if (name === 'FindConfigurationChart')
        return 'Scanning the configuration chart';
    if (name === 'MultiDocumentVerifier') return 'Verifying all documents';
    if (name === 'FindESNAndPartNumberInSB')
        return 'Searching for ESN and Part Number in SB';
    if (name === 'FindATASubChaptersWorkflow')
        return 'Looking at ATA subchapters';
    if (name === 'FindTicket') return 'Finding Tickets';

    return name;
}

export default function StepProgress({ step, description }: StepProgressProps) {
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsCompleted(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    const iconVariants = {
        initial: {
            scale: 0.8,
            opacity: 0,
            rotate: -180,
        },
        animate: {
            scale: 1,
            opacity: 1,
            rotate: 0,
        },
        exit: {
            scale: 0.8,
            opacity: 0,
            rotate: 180,
        },
    };

    const textVariants = {
        initial: {
            opacity: 0,
            y: 10,
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.2,
            },
        },
    };

    return (
        <div className="flex items-center">
            <div className="flex flex-col">
                <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs font-medium text-gray-900"
                >
                    {steps(step)}
                </motion.p>

                {description && (
                    <motion.span
                        className="text-xs text-gray-500"
                        variants={textVariants}
                        initial="initial"
                        animate="animate"
                    >
                        {description}
                    </motion.span>
                )}
            </div>

            <motion.div
                className={`relative rounded-full px-2`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isCompleted ? 'completed' : 'loading'}
                        variants={iconVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 25,
                        }}
                    >
                        {!isCompleted ? (
                            <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                        ) : (
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                        )}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
