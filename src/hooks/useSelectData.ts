import { useCallback, useMemo } from 'react';

type SelectOptions = {
    labelKey: string;
};

type SelectItem = {
    id: number;
};

export default function useSelectData<T extends SelectItem>(data: T[] = [], options: SelectOptions) {
    const items = useMemo(() => {
        return (
            data?.map((item: any) => ({
                value: String(item.id),
                label: item[options.labelKey],
            })) || []
        );
    }, [data, options.labelKey]);

    const getById = useCallback(
        (id: number) => {
            return data?.find((item) => item.id === id);
        },
        [data],
    );

    return {
        items,
        getById,
    };
}
