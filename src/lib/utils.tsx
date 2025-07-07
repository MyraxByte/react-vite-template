import { Navigate, RouteObject } from "react-router";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function defineRoutes(fromIndex: string, fromAny: string, children: RouteObject[] = []) {
	return [
		{
			index: true,
			element: <Navigate to={fromIndex} replace={true} />
		},
		...children,
		{

			index: true,
			path: "*",
			element: <Navigate to={fromAny} replace={true} />,
		}
	];
}