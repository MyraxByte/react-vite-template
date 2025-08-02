import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { TanstackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import "@/lib/dayjs";
import "./api.config";

import MantineProvider from "./providers/mantine-provider";
import { ReactQueryProvider } from "./providers/query-provider";
import { initLocales,logger } from "./lib";
import Router, { router } from "./router";

// Import the generated route tree
import "@/assets/styles/index.css";


logger.init("APP");

void initLocales();
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<ReactQueryProvider>
				<MantineProvider>
					<Router />
				</MantineProvider>
				{/* Devtools */}
				<TanstackDevtools
					plugins={[
						{
							name: "Tanstack Query",
							render: <ReactQueryDevtoolsPanel />,
						},
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel router={router} />,
						},
					]}
				/>
			</ReactQueryProvider>
		</StrictMode>,
	);
}