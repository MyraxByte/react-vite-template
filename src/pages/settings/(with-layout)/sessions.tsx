import { createFileRoute } from "@tanstack/react-router";

import UnderDevelopment from "@/components/UnderDevelopment";
import { i18n } from "@/lib";

export const Route = createFileRoute(
	"/settings/(with-layout)/sessions",
)({
	component: Page,
});

export default function Page() {
	return (
		<div className="flex flex-col">
			{/* Page Header */}
			<div className="flex flex-col">
				<h2 className="text-2xl font-bold text-white">{i18n.t("settings.sessions.title")}</h2>
				<p className="mt-2 text-base text-gray-400">{i18n.t("settings.sessions.description")}</p>
			</div>

			<UnderDevelopment />
		</div>
	);
}
