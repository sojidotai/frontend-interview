import ActivityCard from '@/features/end-of-lease/activity-card';
import AircraftStatusCard from '@/features/end-of-lease/aircraft-details-card';
import { useProjectStats } from '@/features/end-of-lease/api';
import LeaseTimeline from '@/features/end-of-lease/lease-timeline';
import { ProjectMenu } from '@/features/end-of-lease/project-menu';
import { dummyMenu } from '@/features/end-of-lease/sample-data';
import SBTable from '@/features/end-of-lease/sb-table';
import StatusCard from '@/features/end-of-lease/status-card';
import FolderTreeView, { MenuItem } from '@/features/end-of-lease/tree-view';
import { useRouter } from 'next/router';

import AppHeader from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Sections() {
    const router = useRouter();
    const projectId = Number(router.query.id);
    const scope = router.query.scope;
    const { data: stats } = useProjectStats(projectId);

    const handleSBClick = () => {
        console.log('handle sb click');
        const currentQuery = router.query;
        const newQuery = { ...currentQuery, scope: 'sbs' };
        router.push({ pathname: router.pathname, query: newQuery });
    };

    const handleTreeViewClick = (parentName: string, item: MenuItem) => {
        router.push(`/lease/documents/${item.id}/page`);
    };

    return (
        <div className="flex-1 h-full">
            <AppHeader
                links={[
                    { name: 'End of Lease', href: '/' },
                    { name: 'Projects', href: '/leasing/dashboard' },
                    { name: `${projectId}`, href: '#' },
                ]}
            />

            <ProjectMenu projectId={projectId} />

            <div className="container mt-8 space-y-4 pb-8">
                <div className="grid gap-4 md:grid-cols-3">
                    <AircraftStatusCard />
                    {stats && <StatusCard stats={stats} />}
                    <ActivityCard projectId={projectId} />
                </div>

                <LeaseTimeline />

                <Card>
                    <CardHeader>
                        <CardTitle>
                            {scope === undefined
                                ? 'Documentation'
                                : 'Service Bulletins Related to Lease Return'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {scope === undefined && (
                            <FolderTreeView
                                data={dummyMenu}
                                handleClick={handleTreeViewClick}
                                handleSBClick={handleSBClick}
                            />
                        )}
                        {scope == 'sbs' && <SBTable projectId={projectId} />}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
