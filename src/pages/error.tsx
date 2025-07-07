import { PropsWithChildren } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router";

export default function ErrorBoundary() {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return (
			<>
				<h1>
					{error.status} {error.statusText}
				</h1>
				<p>{error.data}</p>
			</>
		);
	} else if (error instanceof Error) {
		return (
			<div>
				<h1>Error</h1>
				<p>{error.message}</p>
				<p>The stack trace is:</p>
				<pre>{error.stack}</pre>
			</div>
		);
	} else {
		return <h1>Unknown Error</h1>;
	}
}

ErrorBoundary.withLayout = function withLayout(Layout: React.ComponentType<PropsWithChildren>) {
	return function ErrorPageWithLayout() {
		return (
			<Layout>
				<ErrorBoundary />
			</Layout>
		);
	};
};
