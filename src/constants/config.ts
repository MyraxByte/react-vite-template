import { toMerged } from "es-toolkit";

import { APP_ENV, ENV_TYPES } from "./env";

// Define the configuration for each environment
const DEV_CONFIG = {
	servers: {
		api: "https://api-develop.example.com/api/v1/"
	},
	authToken: "cordy:admin:auth",
};

const STAGING_CONFIG = toMerged(DEV_CONFIG, {
	servers: {
		api: "https://api-staging.example.com/api/v1/"
	},
});
const PROD_CONFIG = toMerged(DEV_CONFIG, {
	servers: {
		api: "https://api.example.com/api/v1/",
	}
});
const ENV_CONFIGS: Record<ENV_TYPES, typeof DEV_CONFIG> = {
	[ENV_TYPES.development]: DEV_CONFIG,
	[ENV_TYPES.staging]: STAGING_CONFIG,
	[ENV_TYPES.production]: PROD_CONFIG,
};

console.log("APP_ENV:", APP_ENV);
export const CONFIG = ENV_CONFIGS[APP_ENV];
