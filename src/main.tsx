import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "@/lib/dayjs";
import "./api.config";

import MantineProvider from "./providers/mantine-provider";
import { ReactQueryProvider } from "./providers/query-provider";
import { initLocales,logger } from "./lib";
import Router from "./router";

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
			</ReactQueryProvider>
		</StrictMode>,
	);
}