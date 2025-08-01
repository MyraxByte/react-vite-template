import { Icon } from "@iconify/react";

import Logo from "@/assets/images/logo.svg?react";
import Image from "@/components/Image";
import { i18n } from "@/lib/i18n";

import useAuth from "../auth/hooks/useAuth";
export default function UserInfo() {
	const auth = useAuth();

	return (
		<div className="relative text-center">
			<div className="flex w-full justify-center items-center pointer-events-none">
				<Image
					src={auth.user?.profile?.avatarUri}
					alt="Avatar"
					height={160}
					width={160}
					className="w-40 h-40 rounded-full object-cover"
					placeholder={
						<div className="flex items-center overflow-hidden justify-center w-40 h-40 bg-[hsl(223,27%,15%)] border border-[#364153] rounded-full">
							<Logo className="contrast-25"/>
						</div>

					}
				/>
			</div>


			<h1 className="mt-4 text-2xl text-white font-bold transition-opacity duration-200">{auth.user?.profile?.displayName || "Unknown User"}</h1>
			<p className="perspective-1000 group relative h-6 cursor-pointer break-all text-muted-foreground">
				<span className="absolute inset-0 transition-transform duration-300 [backface-visibility:hidden] [transform-style:preserve-3d] truncate group-hover:[transform:rotateX(180deg)]">
					{auth.user?.email}
				</span>
				<span className="absolute inset-0 transition-transform duration-300 [backface-visibility:hidden] [transform-style:preserve-3d] [transform:rotateX(180deg)] group-hover:[transform:rotateX(0deg)]">
					<span className="flex h-6 items-center justify-center gap-2 text-sm">
						<span className="flex items-center gap-2">{i18n.t("userInfo.copyUserId")}
							<span className="inline-flex items-center justify-center">
								<Icon icon="fluent:copy-select-20-regular" fontSize={16} />
							</span>
						</span>
					</span>
				</span>
			</p>
			<div className="mt-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-[hsl(212,100%,32%)] text-white uppercase">
				{auth.user?.userType}
			</div>

		</div>
	);
}