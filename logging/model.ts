// Define log levels
export type LogType = "DEBUG" | "INFO" | "ERROR";

// Define the log entry structure
export interface LogParams {
  type?: LogType; // Optional, defaults to 'INFO'
  message: unknown; // Mandatory
  logId?: string; // Optional
  payload?: any; // Optional, any type
  statusCode?: number; // Optional
  sourceURL?: string; // Optional
  targetURL?: string; // Optional
}

// Logger configuration
export interface LoggerConfig {
  serviceName: string; // Mandatory
  logDir?: string; // Optional, defaults to 'logs'
  logLevel?: LogType; // Optional, defaults to 'INFO'
  format?: string; // Optional, custom log format
}

