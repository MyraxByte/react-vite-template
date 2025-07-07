/**
 * Formatting utilities
 */

/**
 * Format number with thousand separators
 */
export function formatNumber(num: number, locale: string = "en-US"): string {
	return new Intl.NumberFormat(locale).format(num);
}

/**
 * Format currency
 */
export function formatCurrency(
	amount: number,
	currency: string = "USD",
	locale: string = "en-US"
): string {
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
	}).format(amount);
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
	const sizes = ["B", "KB", "MB", "GB", "TB"];
	if (bytes === 0) return "0 B";
	
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + " " + sizes[i];
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 2): string {
	return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
	if (text.length <= length) return text;
	return text.slice(0, length) + "...";
}

/**
 * Format phone number
 */
export function formatPhone(phone: string): string {
	const cleaned = phone.replace(/\D/g, "");
	const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
	
	if (match) {
		return `(${match[1]}) ${match[2]}-${match[3]}`;
	}
	
	return phone;
}
