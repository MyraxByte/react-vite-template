
import { api } from "@/api.config";
import { ApiResponse } from "@/types/api-response";

import { ILoggedUser } from "../interfaces/user";


export const fetchUser = () => api.endpoint<ApiResponse<ILoggedUser>>({
	method: "GET",
	route: "/users/@me",
}).select(res => res.data).execute();