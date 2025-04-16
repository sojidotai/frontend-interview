import { LeaseContractDialog } from '@/features/end-of-lease/lease-contract-dialog';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
            <div className="w-xl">
                <LeaseContractDialog />
            </div>
        </main>
    );
}
