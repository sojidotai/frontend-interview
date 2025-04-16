import Link from 'next/link';

import { cn } from '@/lib/utils';

import { useMenu } from '@/hooks/useMenu';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import UserMenu from './user-menu';

export function AppSidebar() {
    const menu = useMenu();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <UserMenu />
            </SidebarHeader>

            <SidebarContent>
                {menu.map((section, idx) => (
                    <SidebarGroup key={idx}>
                        <SidebarGroupLabel>{section.name}</SidebarGroupLabel>
                        {section.menuItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            item.active &&
                                                'text-primary bg-primary/10',
                                        )}
                                    >
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarGroup>
                ))}
            </SidebarContent>
        </Sidebar>
    );
}
