import { i18n } from "@/lib/i18n";

export default function UnderDevelopment() {
	return (
		<div className="flex flex-col items-center justify-center w-full h-full gap-2 min-h-[400px]">
			<h1 className="text-2xl font-bold text-white">
				{i18n.t("under_development.title")}
			</h1>
			<p className="text-base text-gray-300">{i18n.t("under_development.message")}</p>
		</div>
	);
}