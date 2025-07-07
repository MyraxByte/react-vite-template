import type { PropsWithChildren } from "react";
import { Outlet } from "react-router";

// import bgImage from "@/assets/images/background.png";
import Sidebar from "@/features/sidebar";
import { cn } from "@/lib";

export default function AppLayout({ children }: PropsWithChildren) {
	return (
		<div className="flex items-start justify-start min-h-screen bg-gray-900">
			<div className="absolute inset-0 bg-gradient-to-b to-gray-900 from-gray-700 opacity-25 z-0" />
			<div className="absolute top-0 left-0 right-0 h-1/2 mask-b-from-35% opacity-25">
				{/* Background image */}
				{/* <img
					src={bgImage}
					alt="Background"
					className="absolute h-full w-full object-cover object-center mask-b-from-80%"
				/> */}
			</div>
			<div className="flex flex-row relative h-screen w-full">
				<Sidebar />
				<div id="portal-container" className={cn(
					"pl-64",
					"flex flex-col flex-1 h-full max-h-screen overflow-auto overflow-y-auto",
					"[&::-webkit-scrollbar]:w-2",
					"[&::-webkit-scrollbar-thumb]:rounded-sm",
					"[&::-webkit-scrollbar-thumb]:bg-blue-500/50",
					"[&::-webkit-scrollbar-thumb]:hover:cursor-pointer",
				)}
				>
					{children || <Outlet />}
				</div>
			</div>
		</div>
	);
}

