import { fetchConstants } from '@/services/shared';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function useConstants() {
	return useQuery({
		queryKey: ['CONSTANTS'],
		queryFn: fetchConstants,
	});
}

export function useLoadConstants() {
    const queryClient = useQueryClient();

    return async function prefetch() {
        await queryClient.prefetchQuery({
            queryKey: ['CONSTANTS'],
            queryFn: fetchConstants,
        });
    };
}
