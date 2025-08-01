import { Link } from "@tanstack/react-router";

import { cn } from "@/lib";

type TabProps = {
    label: string;
    to: string;
    active?: boolean;
}

export default function Tab({ label, to, active }: TabProps) {
	return (
		<Link key={to} to={to} data-state={active ? "active" : undefined} className={cn(
			"inline-flex items-center justify-center whitespace-nowrap rounded-md px-2.5 py-1 text-sm font-medium transition-all data-[state=active]:shadow",
			"hover:bg-[#131a28]/40 data-[state=active]:bg-[#131a28] data-[state=active]:text-white cursor-pointer"
		)}>
			{label}
		</Link>
	);
}
