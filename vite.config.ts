import * as path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import i18nextLoader from "vite-plugin-i18next-loader";
import Inspect from "vite-plugin-inspect";
import svgr from "vite-plugin-svgr";

const ReactCompilerConfig = {

};


// https://vitejs.dev/config/
export default defineConfig(() => {
	return {
		base: "/",
		server: {
			host: true,
			port: 8080
		},
		resolve: {
			alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
		},
		plugins: [
			Inspect(),
			svgr(),
			react({
				babel: {
					plugins: [
						["babel-plugin-react-compiler", ReactCompilerConfig],
					],
				},
			}),
			checker({
				typescript: true,
				overlay: true,
				eslint: {
					lintCommand: "eslint \"./src/**/*.{ts,tsx}\"",
					useFlatConfig: true,
				},
			}),
			i18nextLoader({ paths: ["./locales"], namespaceResolution: "basename" })
		],

	};
});
