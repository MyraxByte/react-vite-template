import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { ErrorComponentProps} from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

import CheckIcon from "@/assets/images/icons/check.svg?react";
import CopyIcon from "@/assets/images/icons/copy.svg?react";
import ErrorIcon from "@/assets/images/icons/error.svg?react";
import ExpandMoreIcon from "@/assets/images/icons/expand-more.svg?react";
import HomeIcon from "@/assets/images/icons/home.svg?react";
import LockIcon from "@/assets/images/icons/lock.svg?react";
import RefreshIcon from "@/assets/images/icons/refresh.svg?react";
import SearchOffIcon from "@/assets/images/icons/search-off.svg?react";
import WifiOffIcon from "@/assets/images/icons/wifi-off.svg?react";
import { cn, logger } from "@/lib";
import { Color } from "@/lib/color";

export default function ErrorComponent({ error, reset, info }: ErrorComponentProps) {
	const { t } = useTranslation();
	const [detailsOpened, setDetailsOpened] = useState(false);
	const [copiedAll, setCopiedAll] = useState(false);

	const copyAllErrorInfo = async () => {
		try {
			const errorInfo = [
				`Error: ${getErrorTitle()}`,
				`Message: ${error.message}`,
				`Description: ${getErrorDescription()}`,
				`Error ID: ${Date.now().toString(36)}`,
				`Timestamp: ${new Date().toISOString()}`,
				"",
				"Stack Trace:",
				error.stack || "No stack trace available",
				"",
				"Component Stack:",
				info?.componentStack || "No component stack available"
			].join("\n");

			await navigator.clipboard.writeText(errorInfo);
			setCopiedAll(true);
			setTimeout(() => setCopiedAll(false), 2000);
		} catch (err) {
			logger.error("Failed to copy error info: ", err);
		}
	};

	const getErrorIcon = () => {
		if (error.message.includes("Network")) return WifiOffIcon;
		if (error.message.includes("Permission") || error.message.includes("Unauthorized")) return LockIcon;
		if (error.message.includes("Not Found") || error.message.includes("404")) return SearchOffIcon;
		return ErrorIcon;
	};

	const getErrorTitle = () => {
		if (error.message.includes("Network")) return t("error.title.network");
		if (error.message.includes("Permission") || error.message.includes("Unauthorized")) return t("error.title.permission");
		if (error.message.includes("Not Found") || error.message.includes("404")) return t("error.title.notFound");
		return t("error.title.default");
	};

	const getErrorDescription = () => {
		if (error.message.includes("Network")) return t("error.description.network");
		if (error.message.includes("Permission") || error.message.includes("Unauthorized")) return t("error.description.permission");
		if (error.message.includes("Not Found") || error.message.includes("404")) return t("error.description.notFound");
		return t("error.description.default");
	};

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
							{/* Error Card */}
							<div className="relative z-10 w-full max-w-2xl min-w-4/8 m-auto">
								<div className="bg-[#131a28] border border-[#364153]/50 w-full rounded-2xl shadow-2xl overflow-hidden">
									<div className="p-8 flex flex-col items-center space-y-6">
										{/* Error Icon */}
										<div className="relative">
											<div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl scale-150 opacity-60"></div>
											<div className="relative bg-red-500/10 p-6 rounded-full border border-red-500/30">
												{(() => {
													const IconComponent = getErrorIcon();
													return <IconComponent className="text-5xl text-red-400" style={{ width: "3rem", height: "3rem" }} />;
												})()}
											</div>
										</div>

										{/* Error Content */}
										<div className="text-center space-y-4">
											<h1 className="text-3xl font-bold text-white">
												{getErrorTitle()}
											</h1>

											<p className="text-lg text-gray-300 max-w-md mx-auto">
												{getErrorDescription()}
											</p>

											{error.message && (
												<div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mt-4">
													<p className="text-sm text-red-400 font-medium">
														{error.message}
													</p>
												</div>
											)}
										</div>

										{/* Divider */}
										<div className="w-full h-px bg-[#364153]/50"></div>

										{/* Action Buttons */}
										<div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
											<button
												onClick={reset}
												className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
											>
												<RefreshIcon className="text-lg" style={{ width: "1.125rem", height: "1.125rem" }} />
								                {t("error.buttons.tryAgain")}
											</button>

											<Link
												to="/dashboard"
												className="flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-[#364153] hover:border-[#364153]/80 text-gray-300 hover:text-white font-medium rounded-lg transition-colors duration-200"
											>
												<HomeIcon className="text-lg" style={{ width: "1.125rem", height: "1.125rem" }} />
								                {t("error.buttons.goHome")}
											</Link>
										</div>

										{/* Technical Details (Collapsible) */}
										{(info?.componentStack || error.stack) && (
											<div className="w-full">
												<div className="flex items-center justify-center gap-4">
													<button
														onClick={() => setDetailsOpened(!detailsOpened)}
														className="flex items-center justify-center gap-2 py-2 text-sm text-gray-400 hover:text-gray-300 transition-colors duration-200"
													>
														{t("error.buttons.techDetails")}
														<ExpandMoreIcon
															className={`text-lg transition-transform duration-200 ${detailsOpened ? "rotate-180" : ""}`}
															style={{ width: "1.125rem", height: "1.125rem" }}
														/>
													</button>
												</div>												{detailsOpened && (
													<div className="mt-4 bg-[#0f1419] border border-[#364153]/30 rounded-lg p-4 space-y-4">
														{error.stack && (
															<div>
																<div className="flex items-center justify-between mb-2">
																	<h4 className="text-xs font-semibold text-gray-400">
																		{t("error.stackTrace")}
																	</h4>
																	<button
																		onClick={copyAllErrorInfo}
																		className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded transition-colors duration-200"
																	>
																		{copiedAll ? (
																			<CheckIcon className="text-sm" style={{ width: "0.875rem", height: "0.875rem" }} />
																		) : (
																			<CopyIcon className="text-sm" style={{ width: "0.875rem", height: "0.875rem" }} />
																		)}
																		{copiedAll ? t("error.buttons.copied") : t("error.buttons.copy")}
																	</button>
																</div>
																<pre className="text-xs text-gray-300 bg-black/30 rounded p-3 overflow-x-auto whitespace-pre-wrap break-words">
																	{error.stack}
																</pre>
															</div>
														)}

														{info?.componentStack && (
															<div>
																<div className="flex items-center justify-between mb-2">
																	<h4 className="text-xs font-semibold text-gray-400">
																		{t("error.componentStack")}
																	</h4>
																	<button
																		onClick={copyAllErrorInfo}
																		className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded transition-colors duration-200"
																	>
																		{copiedAll ? (
																			<CheckIcon className="text-sm" style={{ width: "0.875rem", height: "0.875rem" }} />
																		) : (
																			<CopyIcon className="text-sm" style={{ width: "0.875rem", height: "0.875rem" }} />
																		)}
																		{copiedAll ? t("error.buttons.copied") : t("error.buttons.copy")}
																	</button>
																</div>
																<pre className="text-xs text-gray-300 bg-black/30 rounded p-3 overflow-x-auto whitespace-pre-wrap break-words">
																	{info.componentStack}
																</pre>
															</div>
														)}
													</div>
												)}
											</div>
										)}

										{/* Footer */}
										<div className="text-xs text-gray-500 text-center">
							                Error ID: {Date.now().toString(36)} • If this persists, please contact support
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
