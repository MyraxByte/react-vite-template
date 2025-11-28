import type { ComponentType, SVGProps } from "react";
import type { LinkProps } from "@tanstack/react-router";

// Импорты SVG иконок
import HomeFilledIcon from "@/assets/images/icons/home-filled.svg?react";

type BaseRouteItem = {
    label: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>; // SVG компонент вместо строки
    position?: "top" | "bottom"; // позиция элемента в сайдбаре
};

type RouteItemWithLink = BaseRouteItem & {
    to: LinkProps["to"];
    children?: never;
};

type RouteItemWithChildren = BaseRouteItem & {
    to?: never;
    children: RouteItem[];
};

export type RouteItem = RouteItemWithLink | RouteItemWithChildren;

export const sidebarItems: RouteItem[] = [
	{
		label: "Overview",
		to: "/dashboard/overview",
		icon: HomeFilledIcon,
		position: "top",
	}
];