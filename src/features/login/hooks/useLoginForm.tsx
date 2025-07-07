import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginDto, loginSchema } from "../validation/login";

export default function useLoginForm() {
	const form = useForm<LoginDto>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const createSubmit = useCallback((cb: (values: LoginDto) => Promise<void>) => form.handleSubmit(async (values) => {
		try {
			await cb(values);
		} catch {
			form.setError("email", { message: "Invalid credentials" });
			form.setError("password", { message: "Invalid credentials" });

		}
	}), [form]);

	return { form, createSubmit };
}
