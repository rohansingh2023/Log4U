import fs from "fs";
import path from "path";
import moment from "moment";
import { LoggerConfig, LogParams, LogType } from "./model";

export class Logger {
  private serviceName: string;
  private logDir: string;
  private logLevel: LogType;

  constructor({
    serviceName,
    logDir = "logs",
    logLevel = "INFO",
  }: LoggerConfig) {
    this.serviceName = serviceName;
    this.logDir = path.join(process.cwd(), logDir); // Ensure the path is relative to the project root
    this.logLevel = logLevel;

    // Ensure logs directory exists
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir);
    }
  }

  public log({
    type = "INFO",
    message,
    logId,
    payload,
    statusCode,
    sourceURL,
    targetURL,
  }: LogParams): void {
    if (!message) {
      throw new Error('The "message" parameter is required for logging.');
    }

    // Generate timestamps
    const now = moment().format("YYYY-MM-DD HH:mm:ss");
    const date = moment().format("YYYY-MM-DD");
    const logFileName = path.join(this.logDir, `${date}.log`);

    let logMessage = ""
    if(message instanceof Error){
        logMessage = message.stack || message.message
    }else{
        logMessage = String(message)
    }

    // Build the log entry dynamically (only include values)
    const logValues = [
      type,
      now,
      this.serviceName,
      logMessage,
      logId,
      payload ? JSON.stringify(payload) : undefined,
      statusCode,
      sourceURL,
      targetURL,
    ]
      .filter((value) => value !== undefined) // Exclude undefined values
      .join(" | "); // Join values with a separator

    // Write to log file
    fs.appendFileSync(logFileName, logValues + "\n");
  }

}

