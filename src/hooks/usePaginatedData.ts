import { useState } from "react";
import { QueryKey, useQuery } from "@tanstack/react-query";

import { ApiPaginatedQuery, ApiResponse } from "@/types/api-response";

import { useQueryParams } from "./useQueryParams";

type TPaginatedOptions<T> = {
	queryKey: QueryKey;
	queryFn: (paginate: ApiPaginatedQuery) => Promise<ApiResponse<T[]>>;
    params?: Record<string, unknown>;
    defaultLimit?: number;
};

type TPaginatedData<T> = {
	isLoading: boolean;
	isFetched: boolean;
	isFetching: boolean;
	isError: boolean;
	isPending: boolean;
	error: unknown;
	refetch: () => Promise<unknown>;
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

export default function usePaginatedData<T>({ queryKey, queryFn, defaultLimit = 10, params = {} }: TPaginatedOptions<T>): TPaginatedData<T> {
	const [searchParams, setSearchParams] = useQueryParams({
		page: "1",
		limit: `${defaultLimit}`,
	});

	const searchPage = Number(searchParams.page);
	const searchLimit = Number(searchParams.limit);

	const [currentPage, setCurrentPage] = useState(searchPage);
	const [limit, setLimit] = useState(searchLimit);

	const queryParams = {
		...params,
		limit,
		skip: (currentPage - 1) * limit,
	};

	const { isLoading, data, isFetching, isError, isFetched, isPending, error, refetch } = useQuery({
		queryKey: [...queryKey, { ...queryParams, page: currentPage }],
		queryFn: () => queryFn(queryParams),
		staleTime: Infinity,
	});

	const totalPages = Math.ceil((data?.count || 0) / limit);
	const hasPreviousPage = currentPage > 1;
	const hasNextPage = currentPage < totalPages;

	const onPreviousPage = () => {
		if (!hasPreviousPage) return;
		setCurrentPage((prev) => prev - 1);
		setSearchParams("page", `${currentPage - 1}`);
	};

	const onNextPage = () => {
		if (!hasNextPage) return;
		setCurrentPage((prev) => prev + 1);
		setSearchParams("page", `${currentPage + 1}`);
	};

	const onPage = (page: number) => {
		if (page < 1 || page > totalPages) return;
		setCurrentPage(page);
		setSearchParams("page", `${page}`);
	};

	return {
		isLoading,
		isError,
		isFetched,
		isPending,
		isFetching,
		error,
		refetch,
		items: data?.data ?? [],
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
