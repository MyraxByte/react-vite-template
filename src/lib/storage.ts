export default class Storage {
	public static set<T>(key: string, value: T) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	public static get<T>(key: string) {
		const item = localStorage.getItem(key);
		if (!item) return null;
		return JSON.parse(item) as T;
	}

	public static remove(key: string) {
		localStorage.removeItem(key);
	}
}