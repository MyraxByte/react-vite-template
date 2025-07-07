/**
 * Date and time utilities
 */

import dayjs from "dayjs";

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string | number, format: string = "YYYY-MM-DD"): string {
	return dayjs(date).format(format);
}

/**
 * Format date to relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string | number): string {
	return dayjs(date).fromNow();
}

/**
 * Check if date is valid
 */
export function isValidDate(date: any): boolean {
	return dayjs(date).isValid();
}

/**
 * Format duration in milliseconds to human readable format
 */
export function formatDuration(milliseconds: number): string {
	const seconds = Math.floor(milliseconds / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (days > 0) return `${days}d ${hours % 24}h`;
	if (hours > 0) return `${hours}h ${minutes % 60}m`;
	if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
	return `${seconds}s`;
}
