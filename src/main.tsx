import { createRoot } from "react-dom/client";
import { initReactI18next } from "react-i18next";
import { RouterProvider } from "react-router";
import i18n from "i18next";
import resources from "virtual:i18next-loader";

import { logger } from "@/lib";
import MantineProvider from "@/providers/mantine-provider";
import { ReactQueryProvider } from "@/providers/query-provider";

import "@/lib/dayjs";
import "./api.config";

import { router } from "./router";

import "@/assets/styles/index.css";


async function bootstrap() {
	logger.init("APP");

	await i18n.use(initReactI18next).init({
		lng: "en",
		fallbackLng: "en",
		resources,
		interpolation: {
			escapeValue: false, // React already does escaping
		},
	}).then(() => {
		logger.info("i18n initialized");
	}).catch((error) => {
		logger.error("i18n initialization failed", error);
	});

	const rootContainer = document.getElementById("root");
	if (!rootContainer) throw new Error("Can't find root element");

	createRoot(rootContainer).render(
		<ReactQueryProvider>
			<MantineProvider>
				<RouterProvider router={router} />
			</MantineProvider>
		</ReactQueryProvider>
	);

	logger.info("App started");
}

window.onload = bootstrap;
