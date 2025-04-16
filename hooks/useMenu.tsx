import {
    Book,
    BookOpen,
    BotMessageSquare,
    Brain,
    CheckCircle,
    ClipboardList,
    Database,
    FileBox,
    Files,
    Home,
    MessageSquareText,
    MonitorCheck,
    Pickaxe,
    Plane,
    TicketsPlane,
    TowerControl,
} from 'lucide-react';
import { useRouter } from 'next/router';

import { useFlag } from '@/lib/api';

export const useMenu = () => {
    const router = useRouter();
    const { data: exampleLearning } = useFlag('example_learning');
    const { data: endOfLease } = useFlag('end_of_lease');
    const { data: fileSystem } = useFlag('file_system');
    const { data: maintenanceAgent } = useFlag('maintenance_agent');

    const isActive = (href: string) =>
        href === '/'
            ? router.pathname === '/'
            : router.pathname.startsWith(href);

    const createMenuItem = (title: string, icon: any, href: string) => ({
        title,
        icon,
        href,
        active: isActive(href),
    });

    const documentMenu = {
        name: 'Documents',
        menuItems: [createMenuItem('Dashboard', Home, '/')],
    };

    if (fileSystem) {
        documentMenu.menuItems.push(
            createMenuItem('Files', Files, '/file-overview'),
        );
    } else {
        documentMenu.menuItems.push(
            createMenuItem('SBs', ClipboardList, '/document-overview'),
        );
    }

    if (!maintenanceAgent) {
        documentMenu.menuItems.push(
            createMenuItem('Chat', BotMessageSquare, '/minds-agent'),
        );
    }

    const maintenanceMenu = {
        name: 'Maintenance',
        menuItems: [
            createMenuItem(
                'Tickets',
                TicketsPlane,
                '/maintenance/ticket-ingestion',
            ),
            createMenuItem('Agent', BotMessageSquare, '/maintenance/agent'),
        ],
    };

    const systemMenu = {
        name: 'System',
        menuItems: [
            createMenuItem(
                'Conversations',
                MessageSquareText,
                '/conversations',
            ),
            createMenuItem('Domain Knowledge', BookOpen, '/domain-knowledge'),
            createMenuItem('Check', CheckCircle, '/health-check'),
        ],
    };

    const endOfLeaseMenu = {
        name: 'End Of Lease',
        menuItems: [createMenuItem('Projects', Plane, '/lease')],
    };

    const experimentsMenu = {
        name: 'Experiments',
        menuItems: [createMenuItem('AI Extract', Brain, '/ai-extract')],
    };

    let menu = [documentMenu, systemMenu];

    if (endOfLease) {
        menu = [documentMenu, endOfLeaseMenu, systemMenu];
    }

    if (maintenanceAgent) {
        menu.splice(1, 0, maintenanceMenu);
    }

    if (exampleLearning) {
        menu.push(experimentsMenu);
    }

    return menu;
};
