import { createLogger, format, transports } from 'winston';
import { LogLevel } from './logger.enum';

const { combine, timestamp, printf, colorize, errors } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  const formattedMessage = typeof message === 'object' ? JSON.stringify(message, null, 2) : message;
  return `${timestamp} [${level}]: ${stack || formattedMessage}`;
});

export const appLogger = createLogger({
  level: LogLevel.Info,
  format: combine(errors({ stack: true }), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), colorize(), logFormat),
  transports: [
    new transports.Console({
      handleExceptions: true,
    }),
  ],
  exitOnError: false,
});
