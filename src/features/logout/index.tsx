import { Icon } from "@iconify/react";
import { Tooltip } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

import { api } from "@/api.config";
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

	const handleLogout = async (e: React.MouseEvent) => {
		e.preventDefault();

		try {
			await api.post("oauth/logout").data();

			Storage.remove(CONFIG.authToken);
			await queryClient.invalidateQueries({ queryKey: authQueries.key });
			await router.invalidate();
		} catch {
			// Если произошла ошибка при выходе, мы не должны ничего делать,
			// так как пользователь может быть просто не в сети или сервер не доступен.
			// В этом случае просто ничего не делаем, что позволит пользователю остаться на текущей странице.
		}
	};

	if (variant === "settings") return (
		<button onClick={handleLogout} className={cn(
			"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors  h-9 px-4 py-2",
			"hover:bg-gray-700/40 hover:text-gray-200 cursor-pointer text-white"
		)}>
			{i18n.t("auth.logout.buttonText")}
		</button>
	);

	return (
		<Tooltip label={i18n.t("auth.logout.tooltip")} transitionProps={{ transition: "pop-top-right", enterDelay: 350, duration: 300 }} color="black" fz={12}>
			<button onClick={handleLogout} className={cn(
				"cursor-pointer inline-flex group items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors size-8",
				"hover:bg-red-600/25 hover:text-gray-300"
			)}>
				<Icon icon="fluent:arrow-exit-24-filled" className="text-red-500 text-lg" />
			</button>
		</Tooltip>
	);
}