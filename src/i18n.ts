import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import resources from "virtual:i18next-loader";

i18n.use(initReactI18next).init({
	lng: "en",
	resources,
	debug: true,
	interpolation: {
		escapeValue: false, // React already does escaping
	},
}).then(() => {
	console.log("i18n initialized", resources);
}).catch((error) => {
	console.log("Failed to initialize i18n", error);
});

export const locale = i18n;