// logger.ts

import { LogLevel, LogMessage } from "./types";

class Logger {
	private context: LogMessage["context"] = "application";
	private levelPriority: Record<LogLevel, number> = {
		[LogLevel.DEBUG]: 1,
		[LogLevel.INFO]: 2,
		[LogLevel.WARN]: 3,
		[LogLevel.ERROR]: 4,
	};
	private currentLevel?: LogLevel;

	init(context: LogMessage["context"], currentLevel: LogLevel = LogLevel.DEBUG) {
		this.context = context;
		this.currentLevel = currentLevel;
	}

	private shouldLog(level: LogLevel): boolean {
		return this.levelPriority[level] >= this.levelPriority[this.currentLevel!];
	}

	private formatMessage(level: LogLevel, ...message: LogMessage["message"]): LogMessage | null {
		if (!this.shouldLog(level)) return null;

		return {
			level,
			message,
			timestamp: new Date().toISOString(),
			context: this.context,
		};
	}

	private log(level: LogLevel, ...message: LogMessage["message"]) {
		const formattedMessage = this.formatMessage(level, ...message);
		if (!formattedMessage) return;

		const camelContext = this.fromSnakeToCamelCase(formattedMessage.context);

		// Log to console
		switch (level) {
			case LogLevel.DEBUG:
				console.debug(`%c[${level}] %c${camelContext}:`, "color: #888", "color: #ffb600", ...message);
				break;
			case LogLevel.INFO:
				// cyan
				console.info(`%c[${level}] %c${camelContext}:`, "color: #00c5ff", "color: #ffb600", ...message);
				break;
			case LogLevel.WARN:
				console.warn(`%c[${level}] %c${camelContext}:`, "color: #ff7000", "color: #ffb600", ...message);
				break;
			case LogLevel.ERROR:
				console.error(`%c[${level}] %c${camelContext}:`, "color: #ff0055", "color: #ffb600", ...message);
				break;
		}
	}

	public debug(...message: LogMessage["message"]) {
		this.log(LogLevel.DEBUG, ...message);
	}

	public info(...message: LogMessage["message"]) {
		this.log(LogLevel.INFO, ...message);
	}

	public warn(...message: LogMessage["message"]) {
		this.log(LogLevel.WARN, ...message);
	}

	public error(...message: LogMessage["message"]) {
		this.log(LogLevel.ERROR, ...message);
	}

	public setLevel(level: LogLevel) {
		this.currentLevel = level;
	}

	private fromSnakeToCamelCase(str: string) {
		return str
			.split(/[_-]/)
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join("");
	}
}

export const logger = new Logger();
