import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
	beforeLoad: ({ context, location }) => {
		if (context.auth.isAuthenticated) {
			throw redirect({
				to: "/dashboard/overview",
				replace: true,
				search: {
					redirect: location.href,
				},
			});
		}
	},
});
