import { Fragment } from "react/jsx-runtime";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { authQueries } from "@/features/auth/queries";

type TRouterContext = {
    queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<TRouterContext>()({
	beforeLoad: async ({ context }) => {
		const { queryClient } = context;

		const me = await queryClient.ensureQueryData(authQueries.user());
		return {
			auth: {
				isAuthenticated: !!me,
				user: me
			}
		};
	},
	component: RootComponent
});

function RootComponent() {
	return (
		<Fragment>
			<Outlet />
			<TanStackRouterDevtools />
		</Fragment>
	);
}