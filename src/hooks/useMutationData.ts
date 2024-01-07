import { api } from '@/utils/api';
import { InvalidateQueryFilters, QueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';

export type MutationType = 'post' | 'patch' | 'delete';

const MutationMethodByType = {
    post: 'post',
    patch: 'patch',
    delete: 'delete',
};

type TMutationProps<T> = {
    url: (variables: T) => string;
    searchParams?: Record<string, unknown>;
    type?: MutationType;
    queryKeys: {
        invalidate?: InvalidateQueryFilters[];
        remove?: QueryFilters[];
    };
    onSuccess?: () => Promise<void>;
};

export default function useMutationData<T>({ url, type = 'post', onSuccess, queryKeys, searchParams }: TMutationProps<T>) {
    const queryClient = useQueryClient();
    return useMutation<unknown, unknown, T>({
        mutationFn: (variables) => {
            const method = MutationMethodByType[type] as 'post' | 'patch' | 'delete';
            if (method === 'delete') return api.delete(url(variables), { params: searchParams });
            return api[method](url(variables), variables, { params: searchParams });
        },
        onSuccess: async () => {
            if (queryKeys.invalidate && queryKeys.invalidate.length > 0) {
                await Promise.allSettled(queryKeys.invalidate.map((key) => queryClient.invalidateQueries(key)));
            }

            if (queryKeys.remove && queryKeys.remove.length > 0) {
                await Promise.allSettled(queryKeys.remove.map((key) => queryClient.removeQueries(key)));
            }

            if (onSuccess) await onSuccess();
        },
    });
}
