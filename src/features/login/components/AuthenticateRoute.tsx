import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { Loader } from "@mantine/core";

import { useInitialLoad } from "@/hooks/useInitialLoad";
import AuthLayout from "@/pages/auth/layout";
import { useStore } from "@/store";

type AuthenticateRouteProps = {
	method: "guest" | "auth";
	redirect: string;
}

export function AuthenticateRoute(props: AuthenticateRouteProps) {
	const { isReady, prefetch } = useInitialLoad();
	const isAuthenticated = useStore((state) => state.auth.isAuthorized);

	useEffect(() => {
		if (isReady) return;
		void prefetch();
	}, [isReady, prefetch]);


	if (!isReady) return (
		<AuthLayout>
			<Loader className="h-8 w-8 text-blue-500" />
		</AuthLayout>
	);

	if (props.method === "auth" && isAuthenticated) return <Outlet />;
	if (props.method === "guest" && !isAuthenticated) return <Outlet />;

	return <Navigate to={props.redirect || "/"} replace />;
}