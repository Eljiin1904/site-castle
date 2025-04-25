import { LoggerConfig } from "#core/types/logging/LoggerConfig";
import AWS from "aws-sdk";
import winston from "winston";
import CloudWatchTransport from "winston-cloudwatch";

const IS_DEV = process.env.NODE_ENV === "devcloud";
const IS_TEST = process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development";

if (!IS_DEV) {
  AWS.config.update({
    region: process.env.AWS_REGION || "us-east-1",
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  });
}

const { align, colorize, combine, errors, timestamp, json, simple, printf } = winston.format;

const createLogger = (options: LoggerConfig) => {
  const logger = winston.createLogger({
    level: options.level || process.env.LOG_LEVEL || "info",
    defaultMeta: {
      service: process.env.LOG_SERVICE || "default",
      module: options.module || "default",
    },
    format:
      // More Formatted Version of the Log by specifying printf
      process.env.LOG_FORMAT === "printf"
        ? combine(
            colorize({ all: true }),
            errors({ stack: true }),
            timestamp({
              format: "YYYY-MM-DD hh:mm:ss.SSS A",
            }),
            align(),
            printf((info) => {
              const { timestamp, level, message, ...rest } = info;
              return `[${timestamp}] ${level}: ${message} ${JSON.stringify(rest)}`;
            }),
          )
        : combine(
            errors({ stack: true }),
            timestamp({
              format: "YYYY-MM-DD hh:mm:ss.SSS A",
            }),
            json(),
          ),
    transports:
      IS_DEV || IS_TEST
        ? [
            new winston.transports.Console({
              format: combine(colorize(), simple()),
            }),
          ]
        : [
            new CloudWatchTransport({
              logGroupName: options.logGroupName,
              logStreamName: options.logStreamName,
              awsRegion: process.env.AWS_REGION || "us-east-1",
              jsonMessage: true,
              retentionInDays: 30,
              uploadRate: 30000, // how often logs have to be sent to AWS, default 2000ms
            }),
          ],
  });

  return {
    info: (message: string) => logger.info(message),
    warn: (message: string) => logger.warn(message),
    error: (message: string) => logger.error(message),
    debug: (message: string) => logger.debug(message),
  };
};

export const getServerLogger = ({ logGroupName, logStreamName, level, module }: LoggerConfig) => {
  return createLogger({
    logGroupName: logGroupName || "default-log-group",
    logStreamName: logStreamName || "default-log-stream",
    module,
    level,
  });
};
