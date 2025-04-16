import { SidebarTrigger } from '@/components/ui/sidebar';

import { Breadcrumb } from './breadcrumb';

type AppHeaderProps = {
    links: { name: string; href: string }[];
};

export default function AppHeader({ links }: AppHeaderProps) {
    return (
        <header className="flex h-8 shrink-0 items-center gap-3 px-3 pt-3">
            <SidebarTrigger className="h-4 w-4 hover:text-primary hover:scale-110" />
            <Breadcrumb links={links} />
        </header>
    );
}
