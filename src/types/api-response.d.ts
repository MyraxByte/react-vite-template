/**
 * Universal API response.
 *
 * ──►  If `T` is an array, the type includes a `count` property.
 * ──►  If `T` is a single object, only `data` is present.
 */
export type ApiResponse<T = any> =
	T extends readonly any[]
	? { data: T; count: number }
	: { data: T };

export type ApiPaginatedQuery = {
	skip: number;
	limit: number;
};