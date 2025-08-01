import type { LinkProps } from "@tanstack/react-router";

type RouteItem = {
    label: string;
    to: LinkProps["to"];
    icon: string;
};


export const settingsNavigation = [
	{
		label: "Sessions",
		to: "/settings/sessions",
	}
] as RouteItem[];