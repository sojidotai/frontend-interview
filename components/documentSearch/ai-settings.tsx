'use client';

import React from 'react';

import { ChevronDown, ShieldIcon, ZapIcon } from 'lucide-react';

import { RAGModel } from '@/lib/types';
import { cn } from '@/lib/utils';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';

type AISettingsProps = {
    options: RAGModel[];
    selected: RAGModel | undefined;
    onChangeSelection: (model: RAGModel) => void;
};

const COMMERCIAL_MODELS = ['gpt-4o', 'gpt-4o-mini'];

export function AISettings({
    options,
    selected,
    onChangeSelection,
}: AISettingsProps) {
    if (selected == undefined) return null;

    const handleSelect = (m: RAGModel) => onChangeSelection(m);

    const getModelInfo = (model: RAGModel) => {
        const parts = model.displayName.split('/');
        const provider = parts[0];
        const modelName = parts.slice(1).join('/');

        // Extract model size if present (e.g., "7b", "70b")
        const sizeMatch = modelName.match(/(\d+b)/i);
        const modelSize = sizeMatch ? sizeMatch[0] : null;

        const isCommercial = COMMERCIAL_MODELS.some(
            (cm) =>
                modelName.includes(cm) || parts[parts.length - 1].includes(cm),
        );

        return { provider, modelName, modelSize, isCommercial };
    };

    const selectedInfo = getModelInfo(selected);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size="sm"
                    variant="ghost"
                    className="flex items-center gap-1.5 h-8 px-2"
                >
                    {selectedInfo.isCommercial && (
                        <ZapIcon className="w-3 h-3 text-amber-500" />
                    )}
                    <span className="font-medium text-xs">
                        {selectedInfo.modelName}
                        {selectedInfo.modelSize && (
                            <span className="text-xs text-zinc-400 ml-1">
                                {selectedInfo.modelSize}
                            </span>
                        )}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-xl">
                {options.map((model) => {
                    const info = getModelInfo(model);
                    const isSelected = model.id === selected.id;

                    return (
                        <DropdownMenuItem
                            onClick={() => handleSelect(model)}
                            key={model.id}
                            className={cn(
                                'py-1.5 px-2',
                                isSelected && 'bg-zinc-100 dark:bg-zinc-800',
                            )}
                        >
                            <div className="flex items-center gap-2 w-full">
                                {info.isCommercial ? (
                                    <ZapIcon className="w-3 h-3 text-amber-500 flex-shrink-0" />
                                ) : (
                                    <ShieldIcon className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                                )}

                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1">
                                        <span
                                            className={cn(
                                                'font-medium text-sm',
                                                info.isCommercial &&
                                                    'text-amber-700 dark:text-amber-400',
                                            )}
                                        >
                                            {info.modelName}
                                        </span>
                                        {info.modelSize && (
                                            <span className="text-xs text-zinc-500 font-medium">
                                                {info.modelSize}
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-xs text-zinc-500">
                                        {info.provider}
                                    </div>
                                </div>

                                {info.isCommercial && (
                                    <Badge
                                        variant="outline"
                                        className="ml-auto text-[10px] px-1 py-0 h-4 border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800"
                                    >
                                        Commercial
                                    </Badge>
                                )}
                            </div>
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
