import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useAuthStore } from '@/store/auth.store';

const schema = zod.object({
	email: zod.string().email(),
	password: zod.string().min(6),
});

export default function useLoginForm() {
	const login = useAuthStore((state) => state.login);

    const form = useForm({
        mode: 'onChange',
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = form.handleSubmit(async (data) => {
        try {
            await login(data);
        } catch (e: any) {
            if (e.response.data.code === 2) {
                form.setError('email', { message: 'User not found' });
            }

            if (e.response.data.code === 6) {
                form.setError('password', { message: 'Wrong password' });
            }
        }
    });

    return {
        form,
        onSubmit,
    };
}
