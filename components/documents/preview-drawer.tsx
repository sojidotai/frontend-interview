import Link from 'next/link';

import { DocumentStats } from '@/lib/types';

import { usePDFLink } from '@/hooks/usePDFLink';

import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
} from '@/components/ui/drawer';

import { Preview } from './preview';

type PreviewDrawerProps = {
    document: DocumentStats | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export const PreviewDrawer = ({
    document,
    open,
    onOpenChange,
}: PreviewDrawerProps) => {
    const pdfLink = usePDFLink(document?.id || '');

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                {document && <Preview document={document} />}

                <DrawerFooter className="flex flex-row gap-2 justify-end">
                    <DrawerClose>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                    <Link
                        href={pdfLink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button>Open PDF</Button>
                    </Link>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
