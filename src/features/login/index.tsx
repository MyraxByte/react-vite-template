import { Controller } from "react-hook-form";
import { Icon } from "@iconify/react/dist/iconify.js";
import { TextInput } from "@mantine/core";

import useLoginForm from "@/features/login/hooks/useLoginForm";
import { i18n } from "@/lib/i18n";

import useLogin from "./hooks/useLogin";

export default function LoginForm() {
	const { login, isLoading } = useLogin();
	const { form, createSubmit } = useLoginForm();

	const onSubmit = createSubmit(login);

	return (
		<form onSubmit={onSubmit} className="space-y-6">

			<Controller control={form.control} name="email" render={({ field, fieldState }) => (
				<div className="space-y-2">
					<label htmlFor="email" className="block text-sm font-medium dark:text-gray-200">
						{i18n.t("auth.login.email")}
					</label>

					<TextInput
						id="email"
						type={"email"}
						autoComplete="email"
						placeholder="admin@example.com"
						value={field.value}
						onChange={(value) => field.onChange(value.target.value)}
						leftSection={
							<Icon
								icon="fluent:mention-16-regular"
								className="w-[24px] h-[24px] dark:text-gray-400"
							/>
						}
						classNames={{
							input: "mt-1 h-[42px] pl-[40px] block w-full rounded-md border dark:border-gray-600 dark:bg-gray-700 px-3 py-2 dark:text-white dark:placeholder-gray-400 dark:shadow-sm focus:border-[hsl(212,100%,40%)] focus:outline-none focus:ring-1 focus:ring-[hsl(212,100%,40%)]",
							wrapper: "w-full",
							root: "w-full",
							section: "flex items-center justify-center w-[40px] h-[40px] pointer-events-none",
						}}
					/>

					{fieldState.error && (
						<p className="mt-1 text-sm text-red-500">{fieldState.error.message}</p>
					)}
				</div>
			)}
			/>



			<Controller control={form.control} name="password" render={({ field, fieldState }) => (
				<div className="space-y-2">
					<label htmlFor="password" className="block text-sm font-medium dark:text-gray-200">
						{i18n.t("auth.login.password")}
					</label>

					<TextInput
						id="password"
						type={"password"}
						autoComplete="current-password"
						placeholder="admin@example.com"
						value={field.value}
						onChange={(value) => field.onChange(value.target.value)}
						leftSection={
							<Icon icon="fluent:key-16-regular" className="w-[24px] h-[24px] dark:text-gray-400 " />
						}
						classNames={{
							input: "mt-1 h-[42px] pl-[40px] block w-full rounded-md border dark:border-gray-600 dark:bg-gray-700 px-3 py-2 dark:text-white dark:placeholder-gray-400 dark:shadow-sm focus:border-[hsl(212,100%,40%)] focus:outline-none focus:ring-1 focus:ring-[hsl(212,100%,40%)]",
							wrapper: "w-full",
							root: "w-full",
							section: "flex items-center justify-center w-[40px] h-[40px] pointer-events-none",
						}}
					/>

					{fieldState.error && (
						<p className="mt-1 text-sm text-red-500">{fieldState.error.message}</p>
					)}
				</div>
			)}
			/>

			<div className="flex flex-col mt-8 mb-4">
				<button
					type="submit"
					disabled={(form.formState.isSubmitting || !form.formState.isDirty) ? true : false}
					className="flex items-center justify-center h-[42px] relative gap-2 rounded-md shadow-sm cursor-pointer px-4 py-2 text-sm font-medium text-white bg-[hsl(212,100%,32%)] hover:bg-[hsl(212,100%,40%)] active:bg-[hsl(212,100%,28%)] disabled:opacity-75 disabled:cursor-not-allowed disabled:bg-[hsl(212,100%,32%)] disabled:hover:bg-[hsl(212,100%,32%)]"
				>
					{(isLoading || form.formState.isSubmitting) ? (
						<div className="absolute left-4 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
					) : null}
					{i18n.t("auth.login.submit")}
				</button>
			</div>
		</form>
	);
}