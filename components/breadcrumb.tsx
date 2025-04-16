import { ChevronRight } from 'lucide-react';

import {
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    Breadcrumb as BreadcrumbShadCN,
} from '@/components/ui/breadcrumb';

type Link = {
    name: string;
    href: string;
};

type BreadcrumbProps = {
    links: Link[];
};

export function Breadcrumb(prop: BreadcrumbProps) {
    const renderElement = (index: number, link: Link, links: Link[]) => {
        return (
            <BreadcrumbItem key={index}>
                {index < links.length - 1 ? (
                    <>
                        <BreadcrumbLink className="text-xs" href={link.href}>
                            {link.name}
                        </BreadcrumbLink>
                        <ChevronRight className="w-3 h-3" />
                    </>
                ) : (
                    <BreadcrumbPage className="text-xs">
                        {link.name}
                    </BreadcrumbPage>
                )}
            </BreadcrumbItem>
        );
    };
    return (
        <BreadcrumbShadCN>
            <BreadcrumbList>
                {prop.links.map((value, index, array) => {
                    return renderElement(index, value, array);
                })}
            </BreadcrumbList>
        </BreadcrumbShadCN>
    );
}
