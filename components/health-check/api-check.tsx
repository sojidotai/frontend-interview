import { useEffect, useState } from 'react';

import { ping } from '@/lib/api';
import { baseUrl } from '@/lib/config';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import StatusBadge from '../status-badge';

const APICheck = () => {
    const [connected, setConnected] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const pingData = async () => {
            setConnected((await ping()) == 'pong');
        };

        pingData();
    });

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between">
                <CardTitle>API Status</CardTitle>
                <StatusBadge status={connected} />
            </CardHeader>
            <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between text-sm font-medium">
                        API URL:
                        <span className="text-sm font-mono">{baseUrl}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default APICheck;
