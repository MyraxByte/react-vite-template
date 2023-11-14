type QueryKey = readonly unknown[]

type TPaginatedData<T> = {
    isLoading: boolean;
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
