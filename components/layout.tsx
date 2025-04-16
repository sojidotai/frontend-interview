import React, { useState } from 'react';

import { getCookie } from 'cookies-next';

import { SidebarProvider } from '@/components/ui/sidebar';

import { AppSidebar } from './app-sidebar';
import { Toaster } from './ui/sonner';
import useApiKey from '@/hooks/useApiKey';
import { ApiKeyDialog } from './api_key_dialog';

type LayoutProps = {
    children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
    const defaultOpen = getCookie('sidebar:state') === 'true';
    const [apiKey, _, renderedOnClient] = useApiKey();
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogClose = () => setDialogOpen(false);

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            {renderedOnClient && <ApiKeyDialog open={dialogOpen || !apiKey} onClose={handleDialogClose} />}
            <div className="flex flex-row h-screen w-full">
                <AppSidebar />
                <main className="flex-1 h-full">{children}</main>
                <Toaster position="top-right" />
            </div>
        </SidebarProvider>
    );
}
