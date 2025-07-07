import { useState } from "react";

import { CONFIG } from "@/constants/config";
import useLogin from "@/features/login/hooks/useLogin";
import { ILoginResult } from "@/features/login/interfaces/login";
import Storage from "@/lib/storage";
import { getStore } from "@/store";

export function useInitialLoad() {
	const [isReady, setReady] = useState(false);
	const { fetch } = useLogin(false);

	async function prefetch() {
		const auth = getStore().auth;

		try {
			const result = Storage.get<ILoginResult>(CONFIG.authToken);
			if (!result || !result.accessToken) throw new Error("No auth key");

			const user = await fetch();
			if (!user) throw new Error("No user data");

			auth.setUser(user);
			auth.setAuthorized(true);
		} finally {
			setReady(true);
		}
	}

	return {
		isReady,
		prefetch,
	};
}
