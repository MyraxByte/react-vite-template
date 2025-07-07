

import { api } from "@/api.config";
import { ApiResponse } from "@/types/api-response";

import { ILoginResult } from "../interfaces/login";
import { LoginDto } from "../validation/login";


export const logIn = (data: LoginDto) => api
	.endpoint<ApiResponse<ILoginResult>>({
		method: "POST",
		route: "/oauth/token",
		body: {
			grantType: "password",
			accountType: "admin",
			email: data.email,
			password: data.password,
		}
	})
	.select((res) => res.data)
	.execute();