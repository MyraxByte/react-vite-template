import Logo from "@/assets/images/logo.svg?react";
import LoginForm from "@/features/login";

export default function LoginPage() {
	return (
		<div className="w-full max-w-md">
			<div className="mb-8 flex flex-col items-center">
				<div className={"flex flex-col justify-center items-center mt-4 mb-8"}>
					<Logo className="h-12 light:text-black dark:text-white" />
				</div>

				<h2 className="text-center text-3xl font-extrabold dark:text-white light:text-gray-900">
					Login to Admin Panel
				</h2>
				<p className="mt-2 text-center text-sm dark:text-gray-400 light:text-gray-600">
              		Please enter your credentials to access the admin panel
				</p>
			</div>

			<div className="rounded-lg border dark:border-gray-700 dark:bg-gray-800 px-6 py-8 dark:shadow-sm light:border-gray-100 light:bg-white light:shadow-md">
				<LoginForm />
			</div>


			<div className="mt-6 text-center">
				<p className="text-sm text-gray-400">
					No access?{" "}
					<a href="#" className="font-medium dark:text-blue-400 dark:hover:text-blue-300 light:text-blue-600 light:hover:text-blue-500">
						Contact administrator
					</a>
				</p>
			</div>
		</div>
	);
}
