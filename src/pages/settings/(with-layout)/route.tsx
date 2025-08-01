import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";

import Logout from "@/features/logout";
import SettingsTabs from "@/features/settings-tabs";
import UserInfo from "@/features/user-info";
import { cn, i18n } from "@/lib";
import { Color } from "@/lib/color";

export const Route = createFileRoute("/settings/(with-layout)")({
	component: Layout
});

function Layout() {
	const navigate = useNavigate();

	return (
		<div className="flex items-start justify-start min-h-screen">
			<div className="absolute inset-0 dark:bg-sidebar z-0">
				<div className="absolute inset-0 opacity-40" style={{
					backgroundImage: "radial-gradient(closest-corner at 120px 36px, rgba(1, 104, 255, 0.19), rgba(1, 127, 255, 0.08)), linear-gradient(rgb(24 50 100) 15%, rgb(3, 5, 9))"
				}}>
				</div>
				<div className="absolute inset-0 bg-black/40"></div>
			</div>

			<div className={cn(
				"flex flex-row relative h-screen w-full",
				"mx-auto flex max-w-[75rem] flex-col overflow-y-auto px-4 pb-24 pt-6 md:px-6 lg:px-8"
			)} style={{
				["--app-border-color"]: Color.fromHex("#364153").toString(0.5)
			} as React.CSSProperties}>

				{/* Header */}
				<header className="flex items-center justify-between pb-8">
					<button onClick={() => navigate({ to: ".." })} className={cn(
						"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors  h-9 px-4 py-2",
						"hover:bg-gray-700/40 hover:text-gray-200 cursor-pointer text-white"
					)}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left mr-2 h-4 w-4">
							<path d="m12 19-7-7 7-7"></path>
							<path d="M19 12H5"></path>
						</svg>
						{i18n.t("settings.backButton")}
					</button>

					<div className="flex flex-row items-center gap-2">
						<Logout variant="settings" />
					</div>
				</header>

				<main className="flex flex-grow flex-col gap-4 md:flex-row">
					<div className="flex-col space-y-8 min-w-64">
						<UserInfo />
					</div>

					<div className="md:w-3/4 md:pl-12 lg:w-full lg:max-w-[70%]">
						<div dir="ltr" data-orientation="horizontal" className="space-y-6">
							<SettingsTabs />

							<div className="flex flex-col mt-2 space-y-12">
								<Outlet />
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}