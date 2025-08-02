import { api } from "@/api.config";
import { CONFIG } from "@/constants/config";
import type { ILoginResult } from "@/features/login/interfaces/login";
import { logger } from "@/lib";
import Storage from "@/lib/storage";
import type { ApiResponse } from "@/types/api-response";

import type { ILoggedUser } from "../interfaces/user";


export async function fetchUser() {
	const authPayload = Storage.get<ILoginResult>(CONFIG.authToken);
	if (!authPayload) return null;

	try {
		return await api
			.get<ApiResponse<ILoggedUser>>("users/@me")
			.then(res => res.data);
	} catch (error) {
		logger.error("useAuth: Failed to fetch user", error);
		return null;
	}
};