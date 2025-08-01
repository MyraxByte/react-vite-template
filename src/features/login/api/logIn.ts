

import { api } from "@/api.config";
import type { ApiResponse } from "@/types/api-response";

import type { ILoginResult } from "../interfaces/login";
import type { LoginDto } from "../validation/login";


export const logIn = (data: LoginDto) => api
	.post<ApiResponse<ILoginResult>>("oauth/token")
	.json({
		grantType: "password",
		accountType: "admin",
		email: data.email,
		password: data.password,
	})
	.data()
	.then(res => res.data);