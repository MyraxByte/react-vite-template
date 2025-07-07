type Primitive = string | number | boolean | null;
type JsonValue = Primitive | JsonValue[] | { [k: string]: JsonValue };

export type SearchParams = Record<string, JsonValue>;


function isJsonValue(x: unknown): x is JsonValue {
	if (
		x === null ||
    typeof x === "string" ||
    typeof x === "number" ||
    typeof x === "boolean"
	) return true;

	if (Array.isArray(x))
		return x.every(isJsonValue);

	if (typeof x === "object")
		return Object.values(x).every(isJsonValue);

	return false;
}

export function parseString(search: string): SearchParams {
	const searchParams = new URLSearchParams(search);

	return [...searchParams.entries()].reduce<SearchParams>((params, [key, value]) => {
		const decoded = decodeURIComponent(value);

		let candidate: unknown;
		try {
			candidate = JSON.parse(decoded);
		} catch {
			candidate = decoded;
		}

		params[key] = isJsonValue(candidate) ? candidate : decoded;
		return params;
	}, {});
}

export function stringify(input: SearchParams): string {
	const filteredInput = Object.fromEntries(
		Object.entries({ ...input })
			.filter(([, value]) => value !== undefined && value !== "" && value !== null)
			.filter(([, value]) => {
				if (value && typeof value === "object") {
					return Object.entries(value).length !== 0;
				}
				return true;
			})
			.map(([key, value]) => [key, typeof value === "string" ? value : JSON.stringify(value)]),
	);
	if (Object.entries(filteredInput).length > 0) {
		const queryString = new URLSearchParams(filteredInput).toString();
		return "?" + queryString;
	} else {
		return "";
	}
}
