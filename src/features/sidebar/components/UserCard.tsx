import { Link } from "@tanstack/react-router";

import Logo from "@/assets/images/logo.svg?react";
import Image from "@/components/Image";
import useAuth from "@/features/auth/hooks/useAuth";

export default function UserCard() {
	const auth = useAuth();

	const username = (auth.user?.username || auth.user?.profile.displayName) || "Unknown User";
	{/* hover:bg-[hsl(223,27%,15%)] focus:bg-[hsl(223,35%,20%)]  */}
	return (
		<Link to={"/settings"} className="flex items-center flex-row gap-3 rounded-lg px-3 py-2 bg-[hsl(223,27%,15%)] border-[var(--app-border-color)] border transition-colors cursor-pointer">
			<div className="rounded-full flex items-center pointer-events-none w-8 h-8">
				<Image
					src={auth.user?.profile?.avatarUri}
					alt="Avatar"
					height={32}
					width={32}
					className="w-8 h-8 rounded-full object-cover"
					placeholder={
						<Logo className="contrast-50" />
					}
				/>
			</div>


			<div className="flex min-w-0 flex-col">
				<span className="truncate text-sm font-medium text-start text-white">{username}</span>
				<span className="text-xs text-gray-400 text-start">{auth.user?.userType ?? "Unknown"}</span>
			</div>
		</Link>
	);
}