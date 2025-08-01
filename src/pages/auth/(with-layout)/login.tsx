import { createFileRoute } from "@tanstack/react-router";

import Logo from "@/assets/images/logo.svg?react";
import LoginForm from "@/features/login";
import { i18n } from "@/lib";

export const Route = createFileRoute("/auth/(with-layout)/login")({
	component: Layout
});

function Layout() {
	return (
		<div className="w-full max-w-md">
			<div className="mb-8 flex flex-col items-center">
				<div className={"flex flex-col justify-center items-center mt-4 mb-8"}>
					<Logo className="h-12 dark:text-white" />
				</div>

				<h2 className="text-center text-3xl font-extrabold dark:text-white">
					{i18n.t("auth.login.title")}
				</h2>
				<p className="mt-2 text-center text-sm dark:text-gray-300">
					{i18n.t("auth.login.subtitle")}
				</p>
			</div>

			<div className="rounded-lg border dark:border-[hsl(230,49%,22%)] dark:bg-[hsl(223,27%,15%)] px-6 py-8 dark:shadow-sm">
				<LoginForm />
			</div>


			<div className="mt-6 text-center">
				<p className="text-sm text-gray-300">
                 No access?{" "}
					<a href="#" className="font-medium dark:text-[hsl(230,84%,80%)] dark:hover:text-[hsl(230,84%,60%)]">
                        Contact administrator
					</a>
				</p>
			</div>
		</div>
	);
}