/* Upload page to show the progress of files while processing. */
import { UploadArea } from '@/features/end-of-lease/upload-area';
import { useRouter } from 'next/router';

import AppHeader from '@/components/page-header';

const Page = () => {
    const router = useRouter();
    const projectId = Number(router.query.id as string);

    return (
        <div className="flex-1 bg-white min-h-full">
            <AppHeader
                links={[
                    { name: 'End of Lease', href: '/' },
                    { name: 'Projects', href: '/leasing/dashboard' },
                    { name: `${projectId}`, href: '#' },
                    { name: 'Upload', href: '#' },
                ]}
            />

            <UploadArea projectId={projectId} />
        </div>
    );
};

export default Page;
