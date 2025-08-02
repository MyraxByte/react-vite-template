import { Icon } from "@iconify/react";
import { Tooltip } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

import { api } from "@/api.config";
import { Loader } from "@/components/Loader";
import { CONFIG } from "@/constants/config";
import { cn } from "@/lib";
import { i18n } from "@/lib/i18n";
import Storage from "@/lib/storage";

import { authQueries } from "../auth/queries";


type LogoutProps = {
    variant?: "dashboard" | "settings";
}

export default function Logout({ variant }: LogoutProps) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const logoutMutation = useMutation({
		mutationFn: async () => {
			await api.post("oauth/logout");
		},
		onSuccess: async () => {
			Storage.remove(CONFIG.authToken);
			await queryClient.invalidateQueries({ queryKey: authQueries.key });
			await router.invalidate();
		},
		onError: () => {
			// Если произошла ошибка при выходе, мы не должны ничего делать,
			// так как пользователь может быть просто не в сети или сервер не доступен.
			// В этом случае просто ничего не делаем, что позволит пользователю остаться на текущей странице.
		}
	});

	const handleLogout = (e: React.MouseEvent) => {
		e.preventDefault();
		logoutMutation.mutate();
	};

	if (variant === "settings") return (
		<button
			onClick={handleLogout}
			disabled={logoutMutation.isPending}
			className={cn(
				"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2",
				"hover:bg-gray-700/40 hover:text-gray-200 cursor-pointer text-white",
				"disabled:opacity-50 disabled:cursor-not-allowed"
			)}
		>
			{logoutMutation.isPending ? (
				<>
					<Loader className="w-4 h-4" />
					{i18n.t("auth.logout.loading", "Logging out...")}
				</>
			) : (
				i18n.t("auth.logout.buttonText")
			)}
		</button>
	);

	return (
		<Tooltip
			label={logoutMutation.isPending ? i18n.t("auth.logout.loading", "Logging out...") : i18n.t("auth.logout.tooltip")}
			transitionProps={{ transition: "pop-top-right", enterDelay: 350, duration: 300 }}
			color="black"
			fz={12}
		>
			<button
				onClick={handleLogout}
				disabled={logoutMutation.isPending}
				className={cn(
					"cursor-pointer inline-flex group items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors size-8",
					"hover:bg-red-600/25 hover:text-gray-300",
					"disabled:opacity-50 disabled:cursor-not-allowed"
				)}
			>
				{logoutMutation.isPending ? (
					<Loader className="text-red-500 text-lg" />
				) : (
					<Icon icon="fluent:arrow-exit-24-filled" className="text-red-500 text-lg" />
				)}
			</button>
		</Tooltip>
	);
}