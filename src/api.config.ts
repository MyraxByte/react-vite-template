import type {AuthStrategy, HttpHeaders} from "@cordy/endpoint-builder";
import { createClient, JitteredExponentialBackoffRetryStrategy} from "@cordy/endpoint-builder";

import { CONFIG } from "@/constants/config";

import type { ILoginResult } from "./features/login/interfaces/login";
import Storage from "./lib/storage";
import type { ApiResponse, IAuthResult } from "./types/api-response";



/**
 * ==========================================
 * Authentication Strategy
 * ==========================================
 */
class SessionStrategy implements AuthStrategy {

	async enrichRequest(): Promise<Partial<HttpHeaders>> {
		const result = Storage.get<IAuthResult>(CONFIG.authToken);

		return Promise.resolve(result?.accessToken ? {
			Authorization: `Bearer ${result.accessToken}`,
		} : {});
	}

	async handleRequestError(_req: Request, res: Response): Promise<boolean> {
		if (res.status !== 401 && res.status !== 403) return false;
		const tokens = Storage.get<IAuthResult>(CONFIG.authToken);
		if (!tokens?.refreshToken) return false;

		const response = await fetch(CONFIG.servers.api + "oauth/token", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				grantType: "refresh_token",
				accountType: "admin",
				refreshToken: tokens.refreshToken
			}),
		});

		if (!response.ok) {
			if (response.status === 401 || response.status === 403) {
				Storage.remove(CONFIG.authToken);
			}
			return false;
		}
		const json = (await response.json()) as ApiResponse<ILoginResult>;
		if (!json || !json.data.accessToken || !json.data.refreshToken) return false;

		Storage.set(CONFIG.authToken, {
			accessToken: json.data.accessToken,
			refreshToken: json.data.refreshToken,
			expiresAt: json.data.expiresAt,
			tokenType: json.data.tokenType || "Bearer",
		});
		return true;
	}
}


/**
 * ==========================================
 * API Clients
 * ==========================================
 */
export const api = createClient({
	baseUrl: CONFIG.servers.api,
	dedupe: true,
	retryStrategy: new JitteredExponentialBackoffRetryStrategy(3, 300, 10000),
	authStrategy: new SessionStrategy(),
});

