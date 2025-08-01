import { initReactI18next } from "react-i18next";
import i18next from "i18next";
import resources from "virtual:i18next-loader";

import { logger } from "./logger";


export async function initLocales() {
	try {
		await i18next.use(initReactI18next).init({
			lng: "en",
			resources,
			defaultNS: "common",
			interpolation: {
				escapeValue: false, // React already does escaping
			},
		});
	} catch (error) {
		logger.error("Failed to initialize i18n", error);
	}
}

export const i18n = i18next;
