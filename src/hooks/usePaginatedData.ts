import { useState } from 'react';
import { createSearchParams, useSearchParams } from 'react-router-dom';

import { api } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

export default function usePaginatedData<T>({ queryKey, path, defaultLimit = 10, params = {} }: TPaginatedOptions): TPaginatedData<T> {
    const defaultSearchParams = createSearchParams({
        page: '1',
        limit: `${defaultLimit}`,
    });

    const [searchParams, setSearchParams] = useSearchParams(defaultSearchParams);

    const searchPage = Number(searchParams.get('page'));
    const searchLimit = Number(searchParams.get('limit'));

    const [currentPage, setCurrentPage] = useState(searchPage);
    const [limit, setLimit] = useState(searchLimit);

    params.limit = limit;
    params.skip = (currentPage - 1) * limit;

    const fetchData = () => api.get(`${path}`, { params }).then((res) => res.data);

    const { isLoading, data, isError } = useQuery({
        queryKey: [...queryKey, { ...params, page: currentPage }],
        queryFn: fetchData,
        staleTime: Infinity,
    });

    const totalPages = Math.ceil((data?.count || 0) / limit);
    const hasPreviousPage = currentPage > 1;
    const hasNextPage = currentPage < totalPages;

    const onPreviousPage = () => {
        if (!hasPreviousPage) return;
        setCurrentPage((prev) => prev - 1);
        setSearchParams({ page: `${currentPage - 1}` });
    };

    const onNextPage = () => {
        if (!hasNextPage) return;
        setCurrentPage((prev) => prev + 1);
        setSearchParams({ page: `${currentPage + 1}` });
    };

    const onPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        setSearchParams({ page: `${page}` });
    };

    return {
        isLoading,
        isError,
        items: data?.items ?? [],
        meta: {
            total: data?.count ?? 0,
            currentPage,
            totalPages,
            hasPreviousPage,
            hasNextPage,
            limit,
        },
        onPreviousPage,
        onNextPage,
        onPage,
        setLimit,
    };
}
