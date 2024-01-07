import { api } from '@/utils/api';
import { useInfiniteQuery } from '@tanstack/react-query';

export type TInfinityPaginatedResult<T> = ReturnType<typeof useInfiniteData<T>>;

export default function useInfiniteData<T>({ queryKey, path, initialParam, defaultLimit = 10, params }: TInfinityPaginatedOptions) {
    const { data, ...options } = useInfiniteQuery({
        queryKey: [...queryKey, { ...params }],
        queryFn: ({ pageParam }) => api.get<ApiResponseList<T>>(`${path}`, { params: { ...params, ...pageParam } }).then((res) => res.data.data),
        initialPageParam: {
            skip: initialParam?.skip ?? 0,
            limit: initialParam?.limit ?? 10,
        },
        staleTime: 60 * 1000 * 5,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            const hasMore = lastPage.count > allPages.length * lastPageParam.limit;
            const loadedCount = allPages.reduce((acc, page) => acc + page.items.length, 0);

            if (hasMore && allPages.length === 0)
                return {
                    skip: allPages.length * lastPageParam.limit,
                    limit: lastPageParam.limit,
                };

            if (hasMore && allPages.length > 0)
                return {
                    skip: loadedCount,
                    limit: defaultLimit,
                };
        },
    });

    return {
        pages: data?.pages ?? [],
        count: data?.pages?.[0]?.count ?? 0,
        items: data?.pages?.map((page) => page.items).flat() ?? [],
        ...options,
    };
}
