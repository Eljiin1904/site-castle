type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "silent";
export interface LoggerConfig {
  logGroupName?: string;
  logStreamName?: string;
  level?: LogLevel;
  module?: string;
}
