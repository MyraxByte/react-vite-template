import { api } from '@/utils/api';

type LoginData = ApiResponse<{
    expire: number;
    token: string;
}>;

export async function login(form: TLoginForm) {
    const response = await api.post<LoginData>(`/auth/login`, form);

    return response.data.data;
}

type RegisterData = ApiResponse<{
    expire: number;
    token: string;
}>;

export async function register(form: any) {
    const response = await api.post<RegisterData>(`/auth/register`, form);

    return response.data.data;
}

export async function checkEmail(form: { email: string }) {
    const response = await api.post<ApiResponse<{ result: boolean }>>(`/auth/check-email`, form);

    return response.data.data;
}

export async function identify() {
    const response = await api.get<ApiResponse<any>>(`/auth/identify`);

    return response.data.data;
}
