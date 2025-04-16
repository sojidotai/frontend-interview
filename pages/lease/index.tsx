import {
    useDeleteProject,
    useProjects,
    useUpdateProjectStatus,
} from '@/features/end-of-lease/api';
import LeasingProjectsTable from '@/features/end-of-lease/leasing-projects-table';
import { ProjectStatus } from '@/features/end-of-lease/types';
import { Link2, Upload } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'sonner';

// Assuming this type is defined elsewhere
import AppHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';

export default function Home() {
    const { data: projects } = useProjects();
    const deleteProject = useDeleteProject();
    const updateProjectStatus = useUpdateProjectStatus();
    const router = useRouter();

    const handleDelete = async (id: number) => {
        toast.promise(deleteProject.mutateAsync(id), {
            loading: 'Deleting project...',
            success: 'Deleted project',
            error: 'Failed to delete project',
        });
    };

    const handleStatusUpdate = async (
        projectId: number,
        status: ProjectStatus,
    ) => {
        toast.promise(updateProjectStatus.mutateAsync({ projectId, status }), {
            loading: 'Updating project status...',
            success: 'Project status updated',
            error: 'Failed to update project status',
        });
    };

    const handleClick = (id: number) => {
        router.push(`/lease/projects/${id}/page`);
    };

    return (
        <div className="flex-1 bg-white min-h-full">
            <AppHeader
                links={[
                    { name: 'End of Lease', href: '/' },
                    { name: 'Dashboard', href: '#' },
                ]}
            />

            <div className="container my-12 p-4 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Aircraft Leasing Dashboard
                    </h1>

                    <div className="flex flex-row gap-2">
                        <Link href="/lease/connect-api">
                            <Button variant="ghost">
                                <Link2 className="mr-1 h-5 w-5" />
                                Connect to API
                            </Button>
                        </Link>

                        <Link href="/lease/add-contract">
                            <Button>
                                <Upload className="mr-1 h-5 w-5" />
                                Upload New Leasing Contract
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="rounded-md bg-blue-50 p-4 border border-blue-100">
                        <h3 className="font-medium text-blue-800">
                            Active Contracts
                        </h3>
                        <p className="text-2xl font-bold">
                            {projects?.filter((p) => p.status !== 'done')
                                .length || 0}
                        </p>
                    </div>
                    <div className="rounded-md bg-green-50 p-4 border border-green-100">
                        <h3 className="font-medium text-green-800">
                            Completed Contracts
                        </h3>
                        <p className="text-2xl font-bold">
                            {projects?.filter((p) => p.status === 'done')
                                .length || 0}
                        </p>
                    </div>
                </div>

                {projects && projects.length > 0 ? (
                    <LeasingProjectsTable
                        projects={projects}
                        onRowClick={handleClick}
                        onDelete={handleDelete}
                        onStatusUpdate={handleStatusUpdate}
                    />
                ) : (
                    <div className="text-center p-8 bg-gray-50 rounded-lg border">
                        <h3 className="text-lg font-medium text-gray-700">
                            No leasing contracts found
                        </h3>
                        <p className="text-gray-500 mt-1">
                            Upload a new leasing contract to get started
                        </p>
                        <Link
                            href="/lease/add-contract"
                            className="mt-4 inline-block"
                        >
                            <Button variant="outline" className="mt-2">
                                <Upload className="mr-2 h-5 w-5" />
                                Upload Contract
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
