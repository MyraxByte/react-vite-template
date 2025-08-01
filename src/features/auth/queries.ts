import { queryOptions } from "@tanstack/react-query";

import { fetchUser } from "./api/fetchUser";

export const AUTHENTICATED_USER = "AUTHENTICATED_USER";

export const authQueries = {
	key: ["AUTHENTICATED_USER"],
	user: () =>
		queryOptions({
			queryKey: [...authQueries.key],
			queryFn: () => fetchUser(),
			staleTime: 1000 * 60 * 5
		}),
};