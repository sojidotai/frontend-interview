import { useEffect, useState } from 'react';

import { Pagination } from '@/components/ui/pagination';

interface UsePaginationProps {
    totalElements: number;
    limit: number;
}

interface UsePaginationReturn {
    limit: number;
    skip: number;
    Pagination: React.FC<{ className?: string }>;
}

export function usePagination({
    totalElements,
    limit,
}: UsePaginationProps): UsePaginationReturn {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalElements / limit) || 1;

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages > 0 ? totalPages : 1);
        }
    }, [totalPages]);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const skip = (currentPage - 1) * limit;

    const PaginationComponent: React.FC<{ className?: string }> = ({
        className,
    }) => (
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className={className}
        />
    );

    return {
        limit,
        skip,
        Pagination: PaginationComponent,
    };
}
