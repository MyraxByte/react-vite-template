import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

import { CONFIG } from "@/constants/config";
import { authQueries } from "@/features/auth/queries";
import { logger } from "@/lib";
import Storage from "@/lib/storage";

import { logIn } from "../api/logIn";
import type { LoginDto } from "../validation/login";

export default function useLogin() {
	const router = useRouter();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (values: LoginDto) => {
			try {
				const result = await logIn(values);
				if (!result.accessToken) throw new Error("No access token found");

				Storage.set(CONFIG.authToken, result);

				// ВАЖНО: принудительно актуализируем «кто я» до навигации
				// Вариант А: просто перезапрашиваем
				await queryClient.invalidateQueries({ queryKey: authQueries.key });
				await queryClient.refetchQueries({ queryKey: authQueries.key });

				// (Опционально) если логин API возвращает пользователя —
				// можно сразу оптимистично положить его в кеш:
				// queryClient.setQueryData(authQueries.user().queryKey, result.user)

				await router.invalidate();
				await router.navigate({ to: "/dashboard/overview", replace: true });
			} catch (error) {
				logger.error("Login error:", error instanceof Error ? error.message : String(error));
				throw error;
			}
		},

	});

	return {
		login: mutation.mutateAsync,
		isLoading: mutation.isPending,
		isError: mutation.isError,
		error: mutation.error,
	};
}