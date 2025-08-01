import { createFileRoute, Outlet } from "@tanstack/react-router";

import VersionBadge from "@/components/VersionBadge";
import Logout from "@/features/logout";
import Sidebar from "@/features/sidebar";
import { cn } from "@/lib";
import { Color } from "@/lib/color";

export const Route = createFileRoute("/dashboard/(with-layout)")({
	component: Layout
});

function Layout() {
	return (
		<div className="flex items-start justify-start min-h-screen">
			<div className="absolute inset-0 dark:bg-sidebar z-0">
				<div className="absolute inset-0 opacity-40" style={{
					backgroundImage: "radial-gradient(closest-corner at 120px 36px, rgba(1, 104, 255, 0.19), rgba(1, 127, 255, 0.08)), linear-gradient(rgb(24 50 100) 15%, rgb(3, 5, 9))"
				}}>
				</div>
				<div className="absolute inset-0 bg-black/40"></div>
			</div>

			<div className="flex flex-row relative h-screen w-full"
				style={{
					["--app-border-color"]: Color.fromHex("#364153").toString(0.5)
				} as React.CSSProperties}>
				<Sidebar />
				<div id="portal-container" className={cn(
					"pl-64 pt-4",
					"flex flex-col flex-1 h-full max-h-screen overflow-auto overflow-y-auto",
					"[&::-webkit-scrollbar]:w-2",
					"[&::-webkit-scrollbar-thumb]:rounded-sm",
					"[&::-webkit-scrollbar-thumb]:bg-[#8b5cf6]/50",
					"[&::-webkit-scrollbar-thumb]:hover:cursor-pointer",
				)}
				>
					<div className="fixed right-0 top-0 max-sm:hidden">
						<div className="group pointer-events-none absolute top-4 z-10 -mb-8 h-32 w-full origin-top transition-all ease-snappy" style={{ boxShadow: "10px -10px 8px 2px var(--app-border-color)" }}>
							<svg className="absolute -right-7 h-9 origin-top-left skew-x-[30deg] overflow-visible" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 32" xmlSpace="preserve">
								<line stroke="#131a28" strokeWidth="2px" shapeRendering="optimizeQuality" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeMiterlimit="10" x1="1" y1="0" x2="128" y2="0"></line>
								<path stroke="var(--app-border-color)" className="translate-y-[0.5px]" fill="#131a28" shapeRendering="optimizeQuality" strokeWidth="1px" strokeLinecap="round" strokeMiterlimit="10" vectorEffect="non-scaling-stroke" d="M0,0c5.9,0,10.7,4.8,10.7,10.7v10.7c0,5.9,4.8,10.7,10.7,10.7H128V0"></path>
							</svg>
						</div>
					</div>

					<div className="fixed right-2 top-3 z-20 max-sm:hidden bg-[#131a28] rounded-xl">
						<div className="flex gap-1 flex-row items-center bg-gradient-noise-top text-muted-foreground rounded-md p-1 transition-all rounded-bl-xl">
							<VersionBadge />
							<Logout />
						</div>
					</div>

					<div id="content-wrapper" className="flex flex-col flex-1 h-full max-h-screen overflow-auto overflow-y-auto bg-[hsl(223,27%,15%)] border-t-1 border-l-1 border-[var(--app-border-color)] rounded-tl-2xl">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
}