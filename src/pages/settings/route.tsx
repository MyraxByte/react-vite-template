import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
	beforeLoad({ context, location }) {
		if (!context.auth.isAuthenticated) {
			throw redirect({
				to: "/auth/login",
				replace: true,
				search: {
					redirect: location.href,
				},
			});
		}
	}
});
