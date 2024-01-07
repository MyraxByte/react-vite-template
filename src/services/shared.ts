import { api } from '@/utils/api';

export async function fetchConstants() {
    const response = await api.get<ApiResponse<any>>(`/shared/constants`);
    return response.data.data;
}
