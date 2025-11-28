import logo from "@/assets/images/logo.svg";

import SidebarItem from "./components/SidebarItem";
import UserCard from "./components/UserCard";
import { sidebarItems } from "./routes.data";


export default function Sidebar() {
	// Разделяем элементы на верхние и нижние
	const topItems = sidebarItems.filter(item => item.position !== "bottom");
	const bottomItems = sidebarItems.filter(item => item.position === "bottom");

	return (
		<div className="fixed left-0 bottom-0 top-0 w-64">
			<div className="flex h-full flex-col">
				<div className="flex items-center border-gray-700 h-[60px] px-6">
					<div className='flex items-center gap-5'>
						<img src={logo} className="h-7" alt={"logo"} />
						<span className="text-lg font-bold text-white">AI Dashboard</span>
					</div>
				</div>

				<div className="flex flex-1 flex-col overflow-auto py-4">
					{/* Верхние элементы */}
					<nav className="flex flex-col px-4 gap-2">
						{topItems.map((item) => (
							<SidebarItem
								key={item.to || item.label}
								item={item}
							/>
						))}
					</nav>

					{/* Спейсер для разделения */}
					<div className="flex-1" />

					{/* Нижние элементы */}
					{bottomItems.length > 0 && (
						<nav className="flex flex-col px-4 gap-2 mb-4">
							{bottomItems.map((item) => (
								<SidebarItem
									key={item.to || item.label}
									item={item}
								/>
							))}
						</nav>
					)}

					{/* UserCard остается внизу */}
					<div className="flex flex-col px-4">
						<UserCard />
					</div>
				</div>
			</div>
		</div>
	);
}