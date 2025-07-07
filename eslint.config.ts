import js from "@eslint/js";
import { globalIgnores } from "eslint/config";
import react from "eslint-plugin-react";
import * as reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
	// 1. Common settings and ignores
	globalIgnores([
		"node_modules/",
		"dist/",
		"build/",
		"coverage/",
	]),

	// 2. Base JavaScript
	js.configs.recommended,

	// 3. TypeScript with type checking
	tseslint.configs.recommendedTypeChecked,
	{
		languageOptions: {
			globals: globals.browser,
			ecmaVersion: "latest",
			parserOptions: {
				project: "./tsconfig.json",
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},

	// 4️⃣ React
	react.configs.flat.recommended,
	react.configs.flat["jsx-runtime"],
	reactHooks.configs["recommended-latest"],

	// 5. Additional plugins
	...(process.env.NODE_ENV === "development" ? [reactRefresh.configs.recommended] : []),

	{
		plugins: {
			"unused-imports": unusedImports,
			"simple-import-sort": simpleImportSort,
		},
		rules: {
			/* ------- Style -------- */
			quotes: ["error", "double", { avoidEscape: true }],
			semi: ["error", "always"],
			indent: ["error", "tab", { SwitchCase: 1 }],

			/* ------- React Hooks -- */
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "error",
			"react-hooks/react-compiler": "error",

			// eslint-disable-next-line no-irregular-whitespace
			/* ------- Import Sorting & Cleanup ---- */
			"unused-imports/no-unused-imports": "error",
			"unused-imports/no-unused-vars": ["warn", {
				"vars": "all",
				"varsIgnorePattern": "^_",
				"args": "after-used",
				"argsIgnorePattern": "^_"
			}],
			"simple-import-sort/imports": "error",
			"simple-import-sort/exports": "error",

			/* ------- Other  ------ */
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-unsafe-member-access": "off",
			"@typescript-eslint/no-unsafe-argument": "off",
			"@typescript-eslint/no-unsafe-return": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/no-misused-promises": "off"

		},
		settings: { react: { version: "detect" } },

	},

	// 6. Special import groups for src/**
	{
		files: ["src/**/*.{js,ts,jsx,tsx}"],
		rules: {
			"no-var": "off",
			"simple-import-sort/imports": ["error", {
				groups: [
					["^react", "^@?\\w"],
					["^(@|libs|constants)(/.*|$)"],
					["^(@|components)(/.*|$)"],
					["^(@|storage)(/.*|$)"],
					["^\\u0000"],
					["^\\.\\.(?!/?$)", "^\\.\\./?$"],
					["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
					["^.+\\.css$"],
				],
			}],
		},
	}
);
