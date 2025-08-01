import { Menu, Stack, Text, Tooltip } from "@mantine/core";

import appData from "@/app.json";
import { logger } from "@/lib";
import { i18n } from "@/lib/i18n";

const envNamesByPrefix = {
	prod: "Production",
	staging: "Staging",
	dev: "Development",
};


export default function VersionBadge() {
	const version = appData.version;
	const commitHash = appData.checksum.substring(0, 7);

	const branchName = appData.branch;
	const branchPrefix = branchName.split("-")[1] as keyof typeof envNamesByPrefix;

	if (!branchPrefix || !envNamesByPrefix[branchPrefix]) {
		logger.warn(`Unknown branch prefix: ${branchPrefix}. Defaulting to 'dev'.`);
	}

	const branch = envNamesByPrefix[branchPrefix] || "Development";
	const lastUpdate = new Date(appData.last_update).toLocaleString();

	return (
		<Stack pos="relative" align="flex-start">
			<Menu position="bottom-end" shadow="md" radius={16} zIndex={1000} withArrow arrowOffset={52} offset={{ mainAxis: 4, crossAxis: 36 }}>
				<Menu.Target>
					<Tooltip label={i18n.t("app_info.tooltip")} transitionProps={{ transition: "pop-top-right", enterDelay: 350, duration: 300 }} color="black" fz={12}>
						<button className="cursor-pointer inline-flex group items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-700/40 hover:text-foreground disabled:hover:bg-transparent disabled:hover:text-foreground/50 size-8 rounded-bl-xl">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="text-gray-400 group-hover:text-gray-200 transition-colors"
							>
								<circle cx="12" cy="12" r="10" />
								<line x1="12" y1="16" x2="12" y2="12" />
								<line x1="12" y1="8" x2="12.01" y2="8" />
							</svg>
						</button>
					</Tooltip>
				</Menu.Target>

				<Menu.Dropdown className="bg-black/50 backdrop-blur-md border-gray-700/50">
					<div className="min-w-64">
						<div className="flex p-2 items-center gap-2 mb-2 pb-3 border-b border-gray-700">
							<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
							<Text fw={600} size="sm" className="text-white">
								{i18n.t("app_info.title")}
							</Text>
						</div>

						<div className="flex flex-col px-2 pb-1 gap-2">
							<div className="flex items-center justify-between">
								<Text size="xs" className="text-gray-400">{i18n.t("app_info.version")}</Text>
								<div className="px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded-md">
									<Text size="xs" fw={500} className="text-blue-300">
										v{version}
									</Text>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<Text size="xs" className="text-gray-400">{i18n.t("app_info.commitHash")}</Text>
								<div className="px-2 py-0.5 bg-gray-700/50 border border-gray-600 rounded-md font-mono">
									<Text size="xs" className="text-gray-200">
										{commitHash}
									</Text>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<Text size="xs" className="text-gray-400">{i18n.t("app_info.environment")}</Text>
								<div className={`px-2 py-0.5 rounded-md border ${
									branch === "Production"
										? "bg-green-500/20 border-green-500/30 text-green-300"
										: branch === "Staging"
											? "bg-yellow-500/20 border-yellow-500/30 text-yellow-300"
											: "bg-purple-500/20 border-purple-500/30 text-purple-300"
								}`}>
									<Text size="xs" fw={500}>
										{branch}
									</Text>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<Text size="xs" className="text-gray-400">{i18n.t("app_info.buildDate")}</Text>
								<div className="px-2 py-0.5 bg-gray-700/50 border border-gray-600 rounded-md font-mono">
									<Text size="xs" className="text-gray-200">
										{lastUpdate}
									</Text>
								</div>
							</div>
						</div>
					</div>
				</Menu.Dropdown>
			</Menu>
		</Stack>
	);
}
