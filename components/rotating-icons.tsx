import React, { useEffect, useState } from 'react';

import {
    BookOpenCheck,
    ClipboardList,
    FileText,
    Layers,
    RefreshCcw,
    Rocket,
    Search,
} from 'lucide-react';

import { cn } from '@/lib/utils';

const iconsList = [
    { component: Search, description: 'Scanning Service Bulletins' },
    { component: FileText, description: 'Loading PDF documents' },
    { component: RefreshCcw, description: 'Verifying information' },
    { component: Layers, description: 'Organizing technical data' },
    {
        component: ClipboardList,
        description: 'Cross-checking compliance details',
    },
    { component: BookOpenCheck, description: 'Reviewing documentation' },
    { component: Rocket, description: 'Launching analysis' },
];

export default function RotatingIcons() {
    const [currentIconIndex, setCurrentIconIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const icons = iconsList;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
        }, 2000); // Rotate every 2 seconds

        return () => clearInterval(interval);
    }, [icons.length]);

    return (
        <div
            className="relative w-5 h-5"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {icons.map(({ component: Icon }, index) => {
                const isActive = index === currentIconIndex;
                return (
                    <div
                        key={index}
                        className={cn(
                            'absolute inset-0 transition-all duration-1000 ease-in-out',
                            isActive
                                ? 'opacity-100 scale-100'
                                : 'opacity-0 scale-110',
                        )}
                        aria-hidden={!isActive}
                    >
                        <Icon
                            className={cn(
                                'w-5 h-5 transition-colors duration-200 ease-in-out',
                                isActive && isHovered
                                    ? 'text-green-500/80'
                                    : isActive
                                      ? 'text-zinc-800'
                                      : 'text-primary/50',
                            )}
                        />
                    </div>
                );
            })}
        </div>
    );
}
