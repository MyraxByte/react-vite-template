import { RouteObject } from "react-router";

import { AuthenticateRoute } from "@/features/login/components/AuthenticateRoute";
import { defineRoutes } from "@/lib";
import AppLayout from "@/pages/dashboard/layout";
import OverviewPage from "@/pages/dashboard/overview/page";
import ErrorPage from "@/pages/error";

export const AppRoutes: RouteObject = {
	element: <AuthenticateRoute method="auth" redirect="/auth" />,
	children: [
		{
			path: "dashboard",
			Component: AppLayout,
			ErrorBoundary: ErrorPage.withLayout(AppLayout),
			children: defineRoutes("/dashboard/users", "/dashboard", [
				{
					path: "overview",
					Component: OverviewPage,
				},
			]),
		},
	],
};
