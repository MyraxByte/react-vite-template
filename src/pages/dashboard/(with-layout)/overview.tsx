import { createFileRoute } from "@tanstack/react-router";

import UnderDevelopment from "@/components/UnderDevelopment";

export const Route = createFileRoute(
	"/dashboard/(with-layout)/overview",
)({
	component: Page
});

function Page() {
	return (
		<div className="flex flex-col px-6 py-12 gap-6">
			<UnderDevelopment />
		</div>
	);
}