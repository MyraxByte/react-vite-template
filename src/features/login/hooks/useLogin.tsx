import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

import { CONFIG } from "@/constants/config";
import { queryClient } from "@/constants/providers";
import { logger } from "@/lib";
import Storage from "@/lib/storage";
import { getStore } from "@/store";

import { fetchUser } from "../api/fetchUser";
import { logIn } from "../api/logIn";
import { LOGIN_QUERY_KEY } from "../constants/queries";
import { LoginDto } from "../validation/login";

export default function useLogin(enabled: boolean = true) {
	const loadUser = () => fetchUser();

	const { data, isLoading, isPending, isFetching, error, refetch } = useQuery({
		queryKey: [LOGIN_QUERY_KEY],
		queryFn: () => loadUser(),
		enabled,
	});

	const login = useCallback(async (values: LoginDto) => {
		const auth = getStore().auth;
		try {
			const result = await logIn(values);
			if (!result.accessToken)
				throw new Error("No access token found");

			Storage.set(CONFIG.authToken, result);

			const user = await fetchUser();
			if (!user) throw new Error("No user found");

			queryClient.setQueryData([LOGIN_QUERY_KEY], user);

			auth.setUser(user);
			auth.setAuthorized(true);
		} catch (error) {
			logger.error("Login error:", error instanceof Error ? error.message : String(error));
			auth.setUser(null);
			auth.setAuthorized(false);
			throw error;
		}
	}, []);

	return {
		user: data,
		error,
		isLoading,
		isFetching,
		isPending,
		refetch,
		login,
		fetch: () => loadUser(),
	};
}