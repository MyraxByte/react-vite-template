import LoaderSvg from "@/assets/images/loaders/loader.svg?react";
import { cn } from "@/lib";

export default function Preloader() {
	return (
		<div className="flex min-h-screen flex-col dark:bg-gray-900 light:bg-gray-50">

			<div className="absolute inset-0 dark:bg-sidebar z-0">
				<div
					className="absolute inset-0 z-0"
					style={{
						background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), transparent",
					}}
				/>
				<div className="absolute inset-0 opacity-40" style={{
					backgroundImage: "radial-gradient(closest-corner at 120px 36px, rgba(1, 104, 255, 0.19), rgba(1, 127, 255, 0.08)), linear-gradient(rgb(24 50 100) 15%, rgb(3, 5, 9))"
				}}>
				</div>
				<div className="absolute inset-0 bg-black/40"></div>
			</div>


			<div className="flex flex-row relative h-screen w-full">
				<div id="portal-container" className={cn(
					"flex flex-col flex-1 h-full max-h-screen overflow-auto overflow-y-auto",
					"[&::-webkit-scrollbar]:w-2",
					"[&::-webkit-scrollbar-thumb]:rounded-sm",
					"[&::-webkit-scrollbar-thumb]:bg-[#8b5cf6]/50",
					"[&::-webkit-scrollbar-thumb]:hover:cursor-pointer",
				)}
				>

					<div className="flex flex-1 flex-col items-center justify-center py-12 px-8">
						<div className="flex items-center justify-center h-12 w-12 text-[hsl(210,100%,40%)]">
							<LoaderSvg />
						</div>

					</div>
				</div>
			</div>
		</div>
	);
}