'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';
import {
    CircleStop,
    Cpu,
    MessageCircleMore,
    Send,
    WandSparkles,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

type QuestionInputProps = {
    onSubmit: (query: string) => void;
    menu?: React.ReactNode;
    popOver?: React.ReactNode;
    isRunning?: boolean;
    showNew?: boolean;
    onNew?: () => void;
    onCancel?: () => void;
};

export default function QuestionInput({
    onSubmit,
    menu,
    popOver,
    isRunning,
    onCancel,
    onNew,
    showNew,
}: QuestionInputProps) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = () => {
        if (inputValue.trim().length == 0) return;
        if (isRunning) return;

        onSubmit(inputValue);
        setInputValue('');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="rounded overflow-hidden bg-white outline outline-1 outline-primary">
            <div className="flex items-start p-2">
                <WandSparkles className="w-4 h-4 m-2 mr-3" />
                <textarea
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter your question"
                    className="flex-grow mt-1 bg-transparent placeholder-zinc-400 outline-none resize-none min-h-[48px]"
                    style={{
                        height: `${Math.max(48, inputValue.split('\n').length * 24 - 24)}px`,
                    }}
                />
                {showNew && (
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Button size="sm" variant="ghost" onClick={onNew}>
                            <MessageCircleMore className="h-4 w-4" />
                        </Button>
                    </motion.div>
                )}
            </div>
            <div className="flex justify-between items-center p-2">
                <div className="flex flex-row">
                    {popOver && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <Cpu className="text-emerald-600 w-4 h-4" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[600px]">
                                {popOver}
                            </PopoverContent>
                        </Popover>
                    )}
                    {menu}
                </div>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {isRunning ? (
                        <Button size="sm" variant="ghost" onClick={onCancel}>
                            <CircleStop className="h-4 w-4 text-red-400" />
                        </Button>
                    ) : (
                        <Button
                            size="sm"
                            onClick={handleSubmit}
                            variant="ghost"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
