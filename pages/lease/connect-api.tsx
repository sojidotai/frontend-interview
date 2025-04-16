'use client';

import type React from 'react';
import { useState } from 'react';

import { Building2, Check, Plane, Server } from 'lucide-react';

import AppHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface ApiOption {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}

export default function ApiConnectionPage() {
    const [selectedApi, setSelectedApi] = useState<string | null>(null);
    const [authMethod, setAuthMethod] = useState('apiKey');

    const apiOptions: ApiOption[] = [
        {
            id: 'sap',
            title: 'SAP',
            description:
                'Manages core business processes like financials, supply chain, and asset management.',
            icon: <Building2 className="h-10 w-10 text-blue-600" />,
        },
        {
            id: 'salesforce',
            title: 'Salesforce',
            description:
                'Focuses on managing customer interactions, sales, and marketing. Useful for tracking lease agreements.',
            icon: <Building2 className="h-10 w-10 text-blue-500" />,
        },
        {
            id: 'aerdata',
            title: 'AerData STREAM',
            description:
                'Specializes in managing physical assets like aircraft, including maintenance and lease information.',
            icon: <Plane className="h-10 w-10 text-sky-600" />,
        },
        {
            id: 'custom',
            title: 'Custom System',
            description:
                'A custom-built system tailored to our specific leasing needs, including aircraft and customer management.',
            icon: <Server className="h-10 w-10 text-gray-600" />,
        },
    ];

    const handleApiSelect = (id: string) => {
        setSelectedApi(id);
    };

    const handleTestConnection = () => {
        // In a real application, this would test the connection
        alert('Testing connection...');
    };

    const handleSaveConnection = () => {
        // In a real application, this would save the connection details
        alert('Connection saved successfully!');
    };

    return (
        <div className="flex-1 h-full">
            <AppHeader
                links={[
                    { name: 'End of Lease', href: '/' },
                    { name: 'Connect API', href: '/lease/connect-api' },
                ]}
            />

            <div className="container p-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight">
                        API Connection
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Select the system you want to connect to
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    {apiOptions.map((option) => (
                        <Card
                            key={option.id}
                            className={`cursor-pointer transition-all hover:shadow-md ${
                                selectedApi === option.id
                                    ? 'ring-2 ring-primary'
                                    : ''
                            }`}
                            onClick={() => handleApiSelect(option.id)}
                        >
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-xl">
                                    {option.title}
                                </CardTitle>
                                {selectedApi === option.id && (
                                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                                        <Check className="h-4 w-4 text-primary-foreground" />
                                    </div>
                                )}
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4 flex justify-center">
                                    {option.icon}
                                </div>
                                <CardDescription>
                                    {option.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {selectedApi && (
                    <div className="bg-card border rounded-lg p-6 animate-in fade-in-50 duration-300">
                        <h2 className="text-2xl font-semibold mb-6">
                            Connection Details
                        </h2>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="endpoint">
                                        API Endpoint URL
                                    </Label>
                                    <Input
                                        id="endpoint"
                                        placeholder="https://api.example.com/v1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="auth-method">
                                        Authentication Method
                                    </Label>
                                    <Select
                                        value={authMethod}
                                        onValueChange={setAuthMethod}
                                    >
                                        <SelectTrigger id="auth-method">
                                            <SelectValue placeholder="Select authentication method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="apiKey">
                                                API Key
                                            </SelectItem>
                                            <SelectItem value="oauth">
                                                OAuth 2.0
                                            </SelectItem>
                                            <SelectItem value="basic">
                                                Basic Auth
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {authMethod === 'apiKey' && (
                                    <div>
                                        <Label htmlFor="api-key">API Key</Label>
                                        <Input
                                            id="api-key"
                                            type="password"
                                            placeholder="Enter your API key"
                                        />
                                    </div>
                                )}

                                {authMethod === 'basic' && (
                                    <>
                                        <div>
                                            <Label htmlFor="username">
                                                Username
                                            </Label>
                                            <Input
                                                id="username"
                                                placeholder="Enter username"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="password">
                                                Password
                                            </Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder="Enter password"
                                            />
                                        </div>
                                    </>
                                )}

                                {authMethod === 'oauth' && (
                                    <>
                                        <div>
                                            <Label htmlFor="client-id">
                                                Client ID
                                            </Label>
                                            <Input
                                                id="client-id"
                                                placeholder="Enter client ID"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="client-secret">
                                                Client Secret
                                            </Label>
                                            <Input
                                                id="client-secret"
                                                type="password"
                                                placeholder="Enter client secret"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <Label>Connection Options</Label>
                                    <RadioGroup
                                        defaultValue="production"
                                        className="mt-2"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="production"
                                                id="production"
                                            />
                                            <Label htmlFor="production">
                                                Production Environment
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="sandbox"
                                                id="sandbox"
                                            />
                                            <Label htmlFor="sandbox">
                                                Sandbox Environment
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <div className="pt-4">
                                    <Label>Advanced Settings</Label>
                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                        <div>
                                            <Label htmlFor="timeout">
                                                Timeout (seconds)
                                            </Label>
                                            <Input
                                                id="timeout"
                                                type="number"
                                                defaultValue={30}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="retries">
                                                Max Retries
                                            </Label>
                                            <Input
                                                id="retries"
                                                type="number"
                                                defaultValue={3}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <Button
                                variant="outline"
                                onClick={handleTestConnection}
                                className="sm:flex-1"
                            >
                                Test Connection
                            </Button>
                            <Button
                                onClick={handleSaveConnection}
                                className="sm:flex-1"
                            >
                                Save Connection
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
