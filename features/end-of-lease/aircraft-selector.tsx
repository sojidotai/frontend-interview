'use client';

import { useEffect, useState } from 'react';

import { Check, ChevronsUpDown, PlusCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

import { leasingAircraftList } from './sample-data';
import { LeasingAircraft } from './types';

interface AircraftSelectorProps {
    selectedAircraft: LeasingAircraft | undefined;
    onSelectAircraft: (aircraft: LeasingAircraft | undefined) => void;
}

export function AircraftSelector({
    selectedAircraft,
    onSelectAircraft,
}: AircraftSelectorProps) {
    // Pre-select the first aircraft if none is selected
    useEffect(() => {
        if (!selectedAircraft && leasingAircraftList.length > 0) {
            onSelectAircraft(leasingAircraftList[0]);
        }
    }, [selectedAircraft, onSelectAircraft]);

    if (!selectedAircraft) return null;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                >
                    {selectedAircraft.type} ({selectedAircraft.registration})
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full">
                <div className="h-[200px] overflow-y-auto">
                    <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                        Available Aircraft
                    </div>
                    <div>
                        {leasingAircraftList.map((aircraft) => (
                            <button
                                key={aircraft.registration}
                                className="flex w-full items-center px-2 py-1.5 text-sm hover:bg-muted cursor-pointer"
                                onClick={() => {
                                    onSelectAircraft(aircraft);
                                    // Close popover after selection
                                    const closeEvent = new Event(
                                        'pointerdown',
                                        {
                                            bubbles: true,
                                        },
                                    );
                                    document.dispatchEvent(closeEvent);
                                }}
                            >
                                <Check
                                    className={cn(
                                        'mr-2 h-4 w-4',
                                        selectedAircraft?.msn === aircraft.msn
                                            ? 'opacity-100'
                                            : 'opacity-0',
                                    )}
                                />
                                <div className="flex flex-col items-start gap-1 flex-1">
                                    <div>{aircraft.type}</div>
                                    <div className="text-xs text-secondary">
                                        {aircraft.registration} -{' '}
                                        {aircraft.operator}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                    <div className="border-t mx-1 my-1"></div>
                    <button
                        className="flex w-full items-center px-2 py-1.5 text-sm hover:bg-muted cursor-pointer"
                        onClick={() => {
                            // Handle creating new aircraft logic
                            const closeEvent = new Event('pointerdown', {
                                bubbles: true,
                            });
                            document.dispatchEvent(closeEvent);
                        }}
                    >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create new aircraft
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
