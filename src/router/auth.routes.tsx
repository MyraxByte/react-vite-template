import { RouteObject } from "react-router";

import { AuthenticateRoute } from "@/features/login/components/AuthenticateRoute";
import { defineRoutes } from "@/lib";
import AuthLayout from "@/pages/auth/layout";
import LoginPage from "@/pages/auth/login.page";
import ErrorPage from "@/pages/error";

export const AuthRoutes: RouteObject = {
	element: <AuthenticateRoute method="guest" redirect="/dashboard" />,
	children: [
		{
			path: "auth",
			element: <AuthLayout />,
			ErrorBoundary: ErrorPage.withLayout(AuthLayout),
			children: defineRoutes("/auth/login", "/auth", [
				{
					path: "login",
					element: <LoginPage />,
				}
			])
		}
	]
};