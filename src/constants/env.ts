export enum ENV_TYPES {
    development = "development",
    staging = "staging",
    production = "production",
}

const getAppEnv = () => {
	const MODE = import.meta.env.MODE;

	if (MODE in ENV_TYPES) return ENV_TYPES[MODE as keyof typeof ENV_TYPES];
	return ENV_TYPES.development;
};

export const APP_ENV: ENV_TYPES = getAppEnv();
export const isProd = () => APP_ENV === ENV_TYPES.production;
