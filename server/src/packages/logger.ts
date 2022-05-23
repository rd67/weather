import fs from "fs";
import path from "path";
import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";

// Logs dir
const logDir = path.resolve("./logs");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Define log format
export const logFormat = winston.format.printf(
  ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
);

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
export const logger = winston.createLogger({
  exitOnError: false,

  levels: winston.config.npm.levels,

  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),
  transports: [
    new winstonDaily({
      level: "error",
      dirname: logDir, // log file /logs/error/*.log in save
      datePattern: "YYYY-MM-DD",
      filename: `%DATE%-error.log`,
      maxFiles: 30, // 30 Days saved
      handleExceptions: true,
      json: false,
      zippedArchive: true,
      utc: true,
    }),

    new winstonDaily({
      level: "info",
      dirname: logDir, // log file /logs/error/*.log in save
      datePattern: "YYYY-MM-DD",
      filename: `%DATE%-info.log`,
      maxFiles: 30, // 30 Days saved
      handleExceptions: true,
      json: false,
      zippedArchive: true,
      utc: true,
    }),

    new winston.transports.Console({
      level: "info",
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple(),
        logFormat,
        winston.format.colorize({ all: true }),
        winston.format.splat()
      ),
    }),
  ],
});

export const logInfo = (data: any) => {
  logger.info(JSON.stringify(data, null, 2));
};
