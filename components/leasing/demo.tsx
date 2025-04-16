import React, { useState } from 'react';

import axios from 'axios';

import { scanWorkOrder } from '@/lib/api';
import { WorkOrder } from '@/lib/types';

import useApiKey from '@/hooks/useApiKey';

import WorkOrderCard from './work-order';

const Demo = () => {
    const [apiKey, _] = useApiKey();
    const [file, setFile] = useState<File | null>(null);
    const [workOrder, setWorkOrder] = useState<WorkOrder | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;
        const selectedFile = e.target.files[0];

        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setWorkOrder(null);
        } else {
            alert('Please upload a PDF file.');
            e.target.value = '';
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);
        setWorkOrder(await scanWorkOrder(apiKey, file));
        setLoading(false);
    };

    return (
        <div className="p-6 mx-auto">
            <h2 className="text-xl font-semibold mb-4">Upload PDF</h2>
            <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="mb-4 block w-full"
            />
            <button
                onClick={handleUpload}
                className="btn btn-primary w-full mb-4"
                disabled={loading || !file}
            >
                Upload PDF
            </button>

            {loading && (
                <div className="flex justify-center items-center mt-4">
                    {/* Simple spinner using Tailwind */}
                    <svg
                        className="animate-spin h-8 w-8 text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                    </svg>
                </div>
            )}

            {workOrder && <WorkOrderCard workOrder={workOrder} />}
        </div>
    );
};

export default Demo;
