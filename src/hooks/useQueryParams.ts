import { useMemo } from "react";
import { useSearchParams } from "react-router";

/**
 * Hook to manage URL query parameters with defaults.
 *
 * @template T - Record of default parameter values.
 * @param defaults Record of default parameter values.
 * @returns params — current parameters merged with defaults,
 *          setParam — function to set or remove a parameter.
 */
export function useQueryParams<T extends Record<string, string>>(
	defaults: T
) {
	const [searchParams, setSearchParams] = useSearchParams(defaults);

	// Merge defaults with actual non-empty URL params
	const params = useMemo(() => {
		const result: Record<string, string> = { ...defaults };
		searchParams.forEach((value, key) => {
			if (value) {
				result[key] = value;
			}
		});
		return result as T;
	}, [searchParams, defaults]);

	/**
   * Sets or removes a single query parameter.
   * @param key Parameter name.
   * @param value Value to set, or undefined to remove.
   */
	const setParam = <K extends keyof T>(key: K, value?: string) => {
		const newSearchParams = new URLSearchParams(searchParams.toString());
		if (value === undefined) {
			newSearchParams.delete(String(key));
		} else {
			newSearchParams.set(String(key), value);
		}
		setSearchParams(newSearchParams);
	};

	const setParams = (values: Partial<Record<keyof T, string | undefined>>) => {
		const newSearchParams = new URLSearchParams(searchParams.toString());
		Object.entries(values).forEach(([key, value]) => {
			if (value === undefined) {
				newSearchParams.delete(key);
			} else {
				newSearchParams.set(key, value);
			}
		});
		setSearchParams(newSearchParams);
	};

	return [params, setParam, setParams] as const;
}