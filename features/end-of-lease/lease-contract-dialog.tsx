'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { AircraftSelector } from './aircraft-selector';
import { useCreateProject } from './api';
import { leasingAircraftList } from './sample-data';
import { LeasingAircraft } from './types';

export function LeaseContractDialog() {
    const createProject = useCreateProject();

    const [selectedAircraft, setSelectedAircraft] = useState<
        LeasingAircraft | undefined
    >(leasingAircraftList[0]);
    const [lessee, setLessee] = useState('');
    const [endOfLease, setEndOfLease] = useState(
        new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            .toISOString()
            .slice(0, 10),
    );
    const lessor = 'Airborne Capital';
    const [pdfUpload, setPdfUpload] = useState<File | null>(null);

    const japaneseAirlines = [
        { value: 'ANA Group', label: 'ANA Group (Japan)' },
        { value: 'Japan Airlines', label: 'Japan Airlines (JAL)' },
        { value: 'Skymark Airlines', label: 'Skymark (Japan)' },
        { value: 'Peach Aviation', label: 'Peach (Japan)' },
    ];


    const handleSubmit = async () => {
        toast.promise(
            createProject.mutateAsync({
                aircraft: selectedAircraft,
                title: '',
            }),
            {
                loading: 'Creating new project...',
                success: 'Project created successfully!',
                error: 'Error creating project',
            },
        );
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">Create Lease Contract</h1>
            <p className="text-gray-600 mb-6">
                Fill all required fields to generate your lease contract
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* PDF Upload Section */}
                <div className="col-span-2">
                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition duration-200">
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) =>
                                setPdfUpload(e.target.files?.[0] || null)
                            }
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        {pdfUpload ? (
                            <p className="text-blue-500">
                                Uploaded: {pdfUpload.name}
                            </p>
                        ) : (
                            <p className="text-gray-500">
                                Drag &amp; drop PDF here or click to select
                            </p>
                        )}
                    </div>
                </div>

                {/* Column 1 */}
                <div>
                    <Label className="text-gray-700">Contract Title</Label>
                    <Input
                        placeholder="Enter contract title"
                        className={'border-gray-200'}
                    />

                    <div className="mt-4">
                        <Label>Aircraft</Label>
                        <AircraftSelector
                            selectedAircraft={selectedAircraft}
                            onSelectAircraft={setSelectedAircraft}
                        />
                    </div>

                    <div className="mt-4">
                        <Label>Delivery Date</Label>
                        <Input
                            type="date"
                        />
                    </div>
                </div>

                {/* Column 2 */}
                <div>
                    <div>
                        <Label>Lessee</Label>
                        <Select
                            onValueChange={setLessee}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select lessee" />
                            </SelectTrigger>
                            <SelectContent>
                                {japaneseAirlines.map((airline) => (
                                    <SelectItem
                                        key={airline.value}
                                        value={airline.value}
                                    >
                                        {airline.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="mt-4">
                        <Label>End of Lease</Label>
                        <Input
                            type="date"
                            value={endOfLease}
                            onChange={(e) => setEndOfLease(e.target.value)}
                        />
                    </div>

                    <div className="mt-4">
                        <Label>Lessor</Label>
                        <Input
                            value={lessor}
                            disabled
                            className="bg-gray-100"
                        />
                        <p className="text-xs text-gray-500">Lessor is fixed</p>
                    </div>
                </div>
            </div>

            <div className="flex mt-8">
                <Button
                    onClick={handleSubmit}
                    className="transition-all duration-500"
                >
                    Create Contract
                </Button>
            </div>
        </div>
    );
}
