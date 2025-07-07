/**
 * String manipulation utilities
 */

/**
 * Capitalize first letter of string
 */
export function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Convert string to camelCase
 */
export function toCamelCase(str: string): string {
	return str
		.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
			return index === 0 ? word.toLowerCase() : word.toUpperCase();
		})
		.replace(/\s+/g, "");
}

/**
 * Convert string to kebab-case
 */
export function toKebabCase(str: string): string {
	return str
		.replace(/([a-z])([A-Z])/g, "$1-$2")
		.replace(/[\s_]+/g, "-")
		.toLowerCase();
}

/**
 * Convert string to snake_case
 */
export function toSnakeCase(str: string): string {
	return str
		.replace(/([a-z])([A-Z])/g, "$1_$2")
		.replace(/[\s-]+/g, "_")
		.toLowerCase();
}

/**
 * Convert string to Title Case
 */
export function toTitleCase(str: string): string {
	return str
		.toLowerCase()
		.split(" ")
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

/**
 * Remove HTML tags from string
 */
export function stripHtml(html: string): string {
	return html.replace(/<[^>]*>/g, "");
}

/**
 * Generate random string
 */
export function generateRandomString(length: number = 8): string {
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
}

/**
 * Check if string is valid email
 */
export function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

/**
 * Check if string is valid URL
 */
export function isValidUrl(url: string): boolean {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
}

/**
 * Extract domain from URL
 */
export function extractDomain(url: string): string {
	try {
		return new URL(url).hostname;
	} catch {
		return "";
	}
}

/**
 * Slugify string for URLs
 */
export function slugify(str: string): string {
	return str
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_-]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

/**
 * Pluralize word based on count
 */
export function pluralize(word: string, count: number, suffix: string = "s"): string {
	return count === 1 ? word : word + suffix;
}
