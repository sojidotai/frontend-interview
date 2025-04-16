import { Squada_One } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import logo from '../public/soji-logo.png';

const squadaOne = Squada_One({ weight: '400', subsets: ['latin'] });

interface LogoProps {
    text?: string;
    hideText?: boolean;
    className?: string;
    textClassName?: string;
    imageClassName?: string;
}

const Logo = ({
    text = 'SOJI AI',
    hideText = false,
    className,
    textClassName,
    imageClassName,
}: LogoProps) => {
    return (
        <div className={cn('flex items-center gap-2', className)}>
            <Image
                width={32}
                height={32}
                alt="logo"
                src={logo.src}
                className={cn('h-8 w-8 invert', imageClassName)}
            />
            {!hideText && (
                <div
                    className={cn(
                        squadaOne.className,
                        'text-3xl',
                        textClassName,
                    )}
                >
                    {text}
                </div>
            )}
        </div>
    );
};

export default Logo;
