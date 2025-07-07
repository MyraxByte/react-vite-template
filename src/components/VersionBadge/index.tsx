import { Icon } from "@iconify/react";
import { Group, Menu, Stack, Text } from "@mantine/core";

import appData from "@/app.json";
import { logger } from "@/lib";

const envNamesByPrefix = {
	prod: "Production",
	staging: "Staging",
	dev: "Development",
};


export default function VersionBadge() {
	const version = appData.version;
	const commitHash = appData.checksum.substring(0, 7);

	// branch name must be one of the following: v{version}-prod, v{version}-staging, v{version}-dev
	const branchName = appData.branch;
	const branchPrefix = branchName.split("-")[1] as keyof typeof envNamesByPrefix;

	if (!branchPrefix || !envNamesByPrefix[branchPrefix]) {
		logger.warn(`Unknown branch prefix: ${branchPrefix}. Defaulting to 'dev'.`);
	}

	const branch = envNamesByPrefix[branchPrefix] || "Development";
	const lastUpdate = new Date(appData.last_update).toLocaleString();

	return (
		<Stack pos="relative" align="flex-start">
			<Menu position="bottom-start" shadow="md" withArrow offset={0}>
				<Menu.Target>
					<Group
						gap={4}
						py={4}
						px={8}
						style={{
							backgroundColor: "#374151",
							borderRadius: 30,
							border: "1px solid rgba(75,85,99,0.5)",
							cursor: "pointer",
						}}
					>
						<Icon icon="fluent:chevron-down-16-regular" style={{fontSize: 14}} className="text-gray-400"/>
						<Text size="14px" className="text-gray-400">
							v{version}
						</Text>
					</Group>
				</Menu.Target>

				<Menu.Dropdown style={{backgroundColor: "#1f2937", borderColor: "#374151"}}>
					<Stack gap={8} p={8}>
						<Text size="14px" style={{color: "#9ca3af"}}>
							Version:
							<Text span ml={4} style={{color: "#f9fafb"}}>
								v{version}
							</Text>
						</Text>
						<Text size="14px" style={{color: "#9ca3af"}}>
							Commit:
							<Text span ml={4} style={{color: "#f9fafb"}}>
								{commitHash}
							</Text>
						</Text>
						<Text size="14px" style={{color: "#9ca3af"}}>
							Environment:
							<Text span ml={4} style={{color: "#f9fafb"}}>
								{branch}
							</Text>
						</Text>
						<Text size="14px" style={{color: "#9ca3af"}}>
							Last Update:
							<Text span ml={4} style={{color: "#f9fafb"}}>
								{lastUpdate}
							</Text>
						</Text>
					</Stack>
				</Menu.Dropdown>
			</Menu>
		</Stack>
	);
}
