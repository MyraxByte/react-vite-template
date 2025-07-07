// loggerTypes.ts

export enum LogLevel {
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
}

export interface LogMessage {
    level: LogLevel;
    message: (string | number)[];
    timestamp: string;
    context: string;
}
