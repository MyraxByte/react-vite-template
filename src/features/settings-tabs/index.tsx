import { useLocation } from "@tanstack/react-router";

import Tab from "./components/Tab";
import { settingsNavigation } from "./routes.data";

export default function SettingsTabs() {
	const location = useLocation();

	return (
		<nav className="inline-flex h-9 items-center gap-1 rounded-lg bg-[hsl(223,27%,20%)]/75 p-1 text-gray-300 -mx-0.5 w-full justify-start overflow-auto">
			{settingsNavigation.map((item) => (
				<Tab key={item.to} label={item.label} to="/settings/account" active={location.pathname === item.to} />
			))}
		</nav>
	);
}