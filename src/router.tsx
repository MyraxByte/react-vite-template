

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";

import ErrorComponent from "./components/ErrorComponent";
import NotFoundComponent from "./components/NotFoundComponent";
import Preloader from "./components/Preloader";
import { authQueries } from "./features/auth/queries";
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({
	routeTree,
	context: {
		queryClient: undefined!
	},
	defaultNotFoundComponent: NotFoundComponent,
	defaultErrorComponent: ErrorComponent
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

export default function Router() {
	const queryClient = useQueryClient();
	const query = useQuery({
		...authQueries.user(),
		placeholderData: (prev) => prev,
		staleTime: 5 * 60 * 1000,
	});

	if (!query.data && query.isLoading) return <Preloader />;
	return <RouterProvider router={router} context={{ queryClient }} notFoundMode="root" />;
}