import { useEffect,useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";

import ChevronDownIcon from "@/assets/images/icons/chevron-down-regular.svg?react";

import type { RouteItem } from "../routes.data";

type SidebarItemProps = {
	item: RouteItem;
	level?: number;
};

export default function SidebarItem({ item, level = 0 }: SidebarItemProps) {
	const location = useLocation();
	const [isExpanded, setIsExpanded] = useState(false);
	const [height, setHeight] = useState(0);
	const contentRef = useRef<HTMLDivElement>(null);

	const hasChildren = "children" in item && item.children;
	const isActive = item.to ? location.pathname === item.to : false;
	const hasActiveChild = hasChildren && item.children.some(child =>
		child.to && location.pathname === child.to
	);

	// Автоматически раскрываем если есть активный дочерний элемент
	const shouldExpand = isExpanded || hasActiveChild;

	// Обновляем высоту при изменении состояния
	useEffect(() => {
		if (contentRef.current) {
			if (shouldExpand) {
				setHeight(contentRef.current.scrollHeight);
			} else {
				setHeight(0);
			}
		}
	}, [shouldExpand]);

	const handleClick = () => {
		if (hasChildren) {
			setIsExpanded(!isExpanded);
		}
	};

	const baseClasses = "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors border cursor-pointer";
	const paddingLeft = level * 12; // отступ для вложенности

	if (item.to) {
		// Элемент с ссылкой
		const IconComponent = item.icon;
		return (
			<Link
				to={item.to}
				className={`${baseClasses} ${
					isActive
						? "bg-gray-700/25 border-[var(--app-border-color)] text-white"
						: "text-gray-400 border-transparent hover:bg-gray-700/35 hover:text-white"
				}`}
				style={{ paddingLeft: `${12 + paddingLeft}px` }}
			>
				<IconComponent className="text-lg w-5 h-5" />
				<span className="text-inherit leading-0.5">{item.label}</span>
			</Link>
		);
	}

	// Элемент с дочерними элементами
	const IconComponent = item.icon;
	return (
		<div>
			<div
				onClick={handleClick}
				className={`${baseClasses} ${
					hasActiveChild
						? "bg-gray-700/15 border-[var(--app-border-color)]/50 text-white"
						: "text-gray-400 border-transparent hover:bg-gray-700/35 hover:text-white"
				}`}
				style={{ paddingLeft: `${12 + paddingLeft}px` }}
			>
				<IconComponent className="text-lg w-5 h-5" />
				<span className="text-inherit leading-0.5 flex-1">{item.label}</span>
				<ChevronDownIcon
					className={`text-sm w-4 h-4 transition-transform duration-200 ease-out ${shouldExpand ? "rotate-180" : ""}`}
				/>
			</div>

			{/* Анимированный контейнер для дочерних элементов */}
			<div
				className="overflow-hidden transition-all duration-300 ease-out"
				style={{ height: `${height}px` }}
			>
				<div ref={contentRef} className="mt-1 space-y-1">
					{hasChildren && item.children.map((child) => (
						<SidebarItem
							key={child.to || child.label}
							item={child}
							level={level + 1}
						/>
					))}
				</div>
			</div>
		</div>
	);
}