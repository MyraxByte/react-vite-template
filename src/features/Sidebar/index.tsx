import { Link, useLocation } from "react-router";
import { Icon } from "@iconify/react";

import { api } from "@/api.config";
import logo from "@/assets/images/logo.svg";
import VersionBadge from "@/components/VersionBadge";
import { CONFIG } from "@/constants/config";
import { queryClient } from "@/constants/providers";
import Storage from "@/lib/storage";
import { getStore } from "@/store";

import { sidebarItems } from "./routes.data";

export default function Sidebar() {
	const location = useLocation();

	const handleLogout = async () => {
		try {

			await api.endpoint({ method: "POST", route: "/oauth/logout" }).execute();
		} catch (error) {
			console.error("Logout error:", error);
		}

		Storage.remove(CONFIG.authToken);
		const authState = getStore().auth;

		authState.setAuthorized(false);
		authState.setUser(null);
		queryClient.clear();
	};

	return (
		<div className="fixed left-0 bottom-0 top-0 border-r border-gray-700 shadow-md bg-card w-64 bg-gray-800">
			<div className="flex h-full flex-col">
				<div className="flex items-center border-b border-gray-700 h-[60px] px-6 justify-center">
					<div className='flex items-center gap-4'>
						<img src={logo} className="h-7" alt={"logo"} />
						<span className="text-lg font-bold text-white">Admin Portal</span>
					</div>
				</div>

				<div className="flex flex-1 flex-col overflow-auto py-4">
					<nav className="flex flex-col px-4 gap-2">
						{sidebarItems.map((item) => (
							<Link
								key={item.to}
								to={item.to}
								className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors border ${
									location.pathname === item.to ? "bg-gray-700  border-gray-600/50 text-white" : "text-gray-400 border-transparent hover:bg-gray-700 hover:text-white"
								}`}
							>
								<Icon icon={item.icon} className="text-lg"/>
								<span className="text-inherit leading-0.5">{item.label}</span>
							</Link>
						))}
					</nav>
					<div className="flex flex-col px-4 mt-auto">
						<div className="mb-[16px]">
							<VersionBadge/>
						</div>
						<Link
							to={"/"}
							onClick={handleLogout}
							className={"flex items-center  gap-2 rounded-md font-medium px-4 py-2 text-sm transition-colors bg-red-500/20 text-gray-400 border border-red-500/20 hover:bg-red-500/30 hover:text-white"}
						>
							<Icon icon="fluent:arrow-exit-24-filled" className="text-red-500" />
							<span className="text-red-500">Logout</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}