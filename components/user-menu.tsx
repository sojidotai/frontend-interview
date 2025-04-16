'use client';

import React, { useState } from 'react';

import {
    Briefcase,
    ChartNetwork,
    ChevronsUpDown,
    Key,
    MonitorCheck,
    Settings,
    ToggleLeft,
} from 'lucide-react';
import Link from 'next/link';

import { useCommitInfo } from '@/lib/api';
import { enableLangfuse, langfuseLink } from '@/lib/config';
import { cn } from '@/lib/utils';

import useApiKey from '@/hooks/useApiKey';
import { useSettings } from '@/hooks/useSettings';

import { ApiKeyDialog } from '@/components/api_key_dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import Build from './build';
import Logo from './logo';
import { SettingsDialog } from './settings-dialog';
import { SidebarMenuButton } from './ui/sidebar';

const UserMenu = () => {
    const [apiKey, _] = useApiKey();
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleApiKeyClick = () => setDialogOpen(true);
    const handleDialogClose = () => setDialogOpen(false);

    const [settingsOpen, setSettingsOpen] = useState(false);
    const handleSettingsOpen = () => setSettingsOpen(true);
    const handleSettingsClose = () => setSettingsOpen(false);

    const { settings } = useSettings();

    const { data: buildInfo } = useCommitInfo();
    const hasBuildInfo = buildInfo && buildInfo.commitSha !== '';

    return (
        <div className="flex justify-end items-center">
            <ApiKeyDialog open={dialogOpen} onClose={handleDialogClose} />
            <SettingsDialog open={settingsOpen} onClose={handleSettingsClose} />

            <div
                aria-hidden={dialogOpen}
                className="flex items-center w-full space-x-4"
            >
                <div className="relative w-full">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                className={cn(
                                    'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground',
                                    'justify-between',
                                )}
                            >
                                <Logo text="SONANCE" />
                                <ChevronsUpDown className="ml-auto size-4" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="p-2">
                            <DropdownMenuItem
                                className="gap-2"
                                onClick={handleApiKeyClick}
                            >
                                <Key className="h-5 w-5 text-gray-500" />
                                API Key
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="gap-2"
                                onClick={handleSettingsOpen}
                            >
                                <Settings className="h-5 w-5 text-gray-500" />
                                Settings
                            </DropdownMenuItem>
                            {settings.isDebug && (
                                <Link href="/job-queue">
                                    <DropdownMenuItem className="gap-2">
                                        <Briefcase className="h-5 w-5 text-gray-500" />
                                        Background Jobs
                                    </DropdownMenuItem>
                                </Link>
                            )}
                            {settings.isDebug && enableLangfuse && (
                                <Link
                                    href={langfuseLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <DropdownMenuItem className="gap-2">
                                        <ChartNetwork className="w-5 h-5 text-gray-500" />
                                        Langfuse
                                    </DropdownMenuItem>
                                </Link>
                            )}
                            {settings.isDebug && hasBuildInfo && (
                                <DropdownMenuItem>
                                    <Build buildInfo={buildInfo} />
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
};

export default UserMenu;
