'use client';

import { motion } from 'framer-motion';
import { FileText, Plane, UploadCloud } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

interface ProjectMenuProps {
    projectId: number;
}

export function ProjectMenu({ projectId }: ProjectMenuProps) {
    const menuItems = [
        {
            href: `/lease/projects/${projectId}/documents`,
            label: 'All Documents',
            icon: FileText,
            variant: 'ghost' as const,
            color: 'text-zinc-500',
        },
        {
            href: `/lease/projects/${projectId}/aircraft-folder`,
            label: 'Aircraft Folder',
            icon: Plane,
            variant: 'ghost' as const,
            color: 'text-primary',
        },
        {
            href: `/lease/projects/${projectId}/upload`,
            label: 'Upload new file',
            icon: UploadCloud,
            variant: 'default' as const,
            color: 'text-white',
        },
    ];

    return (
        <div className="flex w-full justify-end gap-3 px-16 pt-8">
            {menuItems.map((item, index) => (
                <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.3,
                        delay: index * 0.1,
                        ease: 'easeOut',
                    }}
                >
                    <Link href={item.href}>
                        <Button
                            variant={item.variant}
                            className="group relative overflow-hidden transition-all duration-300 hover:shadow-md"
                        >
                            <motion.span
                                className={`mr-1 ${item.color} transition-all duration-300 group-hover:scale-110`}
                                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                transition={{ duration: 0.5 }}
                            >
                                <item.icon className="size-4" />
                            </motion.span>
                            <span>{item.label}</span>
                            <motion.div
                                className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                                initial={{ width: 0 }}
                                whileHover={{ width: '100%' }}
                                transition={{ duration: 0.3 }}
                            />
                        </Button>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
