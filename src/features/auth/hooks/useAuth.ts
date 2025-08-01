import { useQuery } from "@tanstack/react-query";

import { authQueries } from "../queries";

export default function useAuth() {
	const query = useQuery(authQueries.user());

	return {
		isAuthenticated: query.isSuccess && !!query.data,
		user: query.data,
		isLoading: query.isLoading,
		isError: query.isError,
		error: query.error,
		refetch: query.refetch,
		isRefetching: query.isRefetching,
	};
}

export type IAuthContext = ReturnType<typeof useAuth>;