type TPaginatedData<T> = {
    isLoading: boolean;
    isError: boolean;
    items: T[];
    meta: {
        total: number;
        currentPage: number;
        totalPages: number;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        limit: number;
    };
    onPreviousPage: () => void;
    onNextPage: () => void;
    onPage: (page: number) => void;
    setLimit: (limit: number) => void;
};

type TPaginatedOptions = {
    queryKey: QueryKey;
    path: string;
    params?: Record<string, unknown>;
    defaultLimit?: number;
};

type TInfinityPaginatedOptions = {
    queryKey: QueryKey;
    path: string;
    params?: Record<string, unknown>;
    defaultLimit?: number;
    initialParam?: {
        skip?: number;
        limit?: number;
    };
};

type TInfinityPaginatedData<T> = {
    pages: Array<ApiResponseList<T>['data']>;
    count: number;
    items: T[];
};
