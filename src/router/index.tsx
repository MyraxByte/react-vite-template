import { createBrowserRouter } from "react-router";

import { defineRoutes } from "@/lib";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";


export const router = createBrowserRouter([
	AuthRoutes,
	AppRoutes,
	{
		path: "/",
		children: defineRoutes("/dashboard", "/dashboard"),
	}
]);
