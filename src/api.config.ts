
import { CONFIG } from "@/constants/config";
import { ApiClient, AuthPayload } from "@/lib";

import { ILoginResult } from "./features/login/interfaces/login";
import Storage from "./lib/storage";
import { ApiResponse } from "./types/api-response";

/**
 * ==========================================
 * API Clients
 * ==========================================
 */
export const api = new ApiClient(CONFIG.servers.api);


/**
 * ==========================================
 * Configure API Client
 * ==========================================
 */
api.addAuthInterceptors({
	getAuthPayload: () => {
		const result = Storage.get<AuthPayload>(CONFIG.authToken);
		return Promise.resolve(result);
	},
	setAuthPayload: (payload: AuthPayload) => {
		Storage.set(CONFIG.authToken, payload);
		return Promise.resolve();
	},
	clearAuthPayload: () => {
		Storage.remove(CONFIG.authToken);
		return Promise.resolve();
	},
	applyAuthHeader: (request, payload) => {
		if (payload && payload.accessToken) {
			request.headers = {
				...request.headers,
				Authorization: `Bearer ${payload.accessToken}`,
			};
		}
		return Promise.resolve(request);
	},
	refreshTokens: async (payload) => {
		var endpoint = await api.endpoint<ApiResponse<ILoginResult>>({
			method: "POST",
			route: "/oauth/token",
			body: {
				grantType: "refresh_token",
				accountType: "admin",
				refreshToken: payload.refreshToken
			},
		}).select(res => res.data).execute();

		return {
			accessToken: endpoint.accessToken,
			refreshToken: endpoint.refreshToken,
			expiresAt: endpoint.expiresAt,
			tokenType: endpoint.tokenType,
		};
	},
});
