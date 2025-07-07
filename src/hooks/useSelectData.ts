import { useCallback, useMemo } from "react";

type SelectOptions = {
	labelKey: string;
};

type SelectItem = {
	id: number;
};

export default function useSelectData<T extends SelectItem & Record<string, any>>(data: T[] = [], options: SelectOptions) {
	const items = useMemo(() => {
		return (
			data?.map((item) => ({
				value: String(item.id),
				label: item[options.labelKey] as string,
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
