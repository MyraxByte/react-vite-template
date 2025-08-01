import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";

import HomeIcon from "@/assets/images/icons/home.svg?react";
import SearchOffIcon from "@/assets/images/icons/search-off.svg?react";
import { cn } from "@/lib";
import { Color } from "@/lib/color";



export default function NotFoundComponent() {
	const { t } = useTranslation();
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="flex flex-row relative h-screen w-full" style={{
				["--app-border-color"]: Color.fromHex("#364153").toString(0.5)
			} as React.CSSProperties}>
				<div id="portal-container" className={cn(
					"flex flex-col flex-1 h-full max-h-screen overflow-auto overflow-y-auto",
					"[&::-webkit-scrollbar]:w-2",
					"[&::-webkit-scrollbar-thumb]:rounded-sm",
					"[&::-webkit-scrollbar-thumb]:bg-[#8b5cf6]/50",
					"[&::-webkit-scrollbar-thumb]:hover:cursor-pointer",
				)}
				>

					<div id="content-wrapper" className="flex flex-col flex-1 h-full max-h-screen overflow-auto overflow-y-auto bg-[hsl(223,27%,15%)]">
						<div className="flex items-center justify-center p-4 my-auto">
							{/* NotFound Card */}
							<div className="relative z-10 w-full max-w-2xl min-w-4/8 m-auto">
								<div className="bg-[#131a28] border border-[#364153]/50 w-full rounded-2xl shadow-2xl overflow-hidden">
									<div className="p-8 flex flex-col items-center space-y-6">
										{/* NotFound Icon */}
										<div className="relative">
											<div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl scale-150 opacity-60"></div>
											<div className="relative bg-blue-500/10 p-6 rounded-full border border-blue-500/30">
												<SearchOffIcon className="text-5xl text-blue-400" style={{ width: "3rem", height: "3rem" }} />
											</div>
										</div>

										{/* NotFound Content */}
										<div className="text-center space-y-4">
											<h1 className="text-3xl font-bold text-white">
												{t("notFound.title")}
											</h1>

											<p className="text-lg text-gray-300 max-w-md mx-auto">
												{t("notFound.description")}
											</p>

											<div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-4">
												<p className="text-sm text-blue-400 font-medium">
													{t("notFound.message")}
												</p>
											</div>
										</div>										{/* Action Buttons */}
										<div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
											<Link
												to="/dashboard"
												className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
											>
												<HomeIcon className="text-lg" style={{ width: "1.125rem", height: "1.125rem" }} />
												{t("notFound.buttons.goToDashboard")}
											</Link>

											<Link
												to=".."
												replace
												className="flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-[#364153] hover:border-[#364153]/80 text-gray-300 hover:text-white font-medium rounded-lg transition-colors duration-200"
											>
												← {t("notFound.buttons.goBack")}
											</Link>
										</div>

										{/* Additional Info */}
										<div className="w-full pt-4 border-t border-[#364153]/30">
											<div className="text-center">
												<p className="text-xs text-gray-500">
													{t("notFound.supportMessage")}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
