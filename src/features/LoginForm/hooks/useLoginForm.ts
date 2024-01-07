import { useAuthStore } from '@/store/auth.store';
import { useForm, zodResolver } from '@mantine/form';
import * as zod from 'zod';

const schema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
});

export default function useLoginForm() {
    const login = useAuthStore((state) => state.login);

    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = form.onSubmit(async (data) => {
        try {
            await login(data);
        } catch (e: any) {
            if (e.response.data.code === 2) {
                form.setFieldError('email', 'User not found');
            }

            if (e.response.data.code === 6) {
                form.setFieldError('password', 'Wrong password');
            }
        }
    });

    return {
        form,
        onSubmit,
    };
}
