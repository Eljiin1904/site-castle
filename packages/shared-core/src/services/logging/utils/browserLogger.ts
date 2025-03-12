import { LoggerConfig } from "#core/types/logging/LoggerConfig";
import log from "loglevel";
import AWS from "aws-sdk";
import { LOG_LEVEL_CONSTANTS } from "../constants/LogConstant";

const IS_DEV = process.env.NODE_ENV === "devcloud";

if (!IS_DEV) {
  AWS.config.update({
    region: process.env.AWS_REGION || "us-east-1",
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  });
}
// Frontend: Use loglevel for logging in the browser
const createLogger = (options: LoggerConfig) => {
  log.setLevel(options.level || "info");
  if (!IS_DEV) {
    return {
      info: (message: string) =>
        sendLogToCloudWatch(
          message,
          LOG_LEVEL_CONSTANTS.LOG_INFO,
          options.logGroupName,
          options.logStreamName,
        ),
      warn: (message: string) =>
        sendLogToCloudWatch(
          message,
          LOG_LEVEL_CONSTANTS.LOG_WARN,
          options.logGroupName,
          options.logStreamName,
        ),
      error: (message: string) =>
        sendLogToCloudWatch(
          message,
          LOG_LEVEL_CONSTANTS.LOG_ERROR,
          options.logGroupName,
          options.logStreamName,
        ),
      debug: (message: string) =>
        sendLogToCloudWatch(
          message,
          LOG_LEVEL_CONSTANTS.LOG_DEBUG,
          options.logGroupName,
          options.logStreamName,
        ),
    };
  } else {
    return {
      info: (message: string) => log.info(message),
      warn: (message: string) => log.warn(message),
      error: (message: string) => log.error(message),
      debug: (message: string) => log.debug(message),
    };
  }
};

const cloudwatchlogs = new AWS.CloudWatchLogs();

const createLogStreamIfNeeded = async (
  logGroupName: string = "default-log-group",
  logStreamName: string = "default-log-stream",
) => {
  try {
    const describeStreamsParams = {
      logGroupName: logGroupName,
    };

    const describeStreamsResponse = await cloudwatchlogs
      .describeLogStreams(describeStreamsParams)
      .promise();

    // Check if the logStreams array exists and is not empty
    const logStreams = describeStreamsResponse?.logStreams || [];
    const streamExists = logStreams.some((stream) => stream.logStreamName === logStreamName);
    if (!streamExists) {
      const createStreamParams = {
        logGroupName: logGroupName,
        logStreamName: logStreamName,
      };
      await cloudwatchlogs.createLogStream(createStreamParams).promise();
      console.log(`Log stream "${logStreamName}" created.`);
    }
  } catch (error) {
    console.error("Error creating log stream:", error);
  }
};

// Function to send logs to CloudWatch
const sendLogToCloudWatch = async (
  message: string,
  level = "info",
  logGroupName: string = "default-log-group",
  logStreamName: string = "default-log-stream",
) => {
  try {
    // Ensure log stream exists before sending logs
    await createLogStreamIfNeeded();

    const logEvent = {
      logGroupName: logGroupName,
      logStreamName: logStreamName,
      logEvents: [
        {
          timestamp: Date.now(),
          message: `[${level}] - ${message}`,
        },
      ],
    };

    // Get the sequence token if available
    const sequenceToken = await getSequenceToken();

    // Conditionally include the sequence token only if it's a valid string
    const putLogEventsParams = {
      ...logEvent,
      ...(sequenceToken && { sequenceToken }), // Include the sequence token only if it's defined
    };

    // Send log events to CloudWatch
    const response = await cloudwatchlogs.putLogEvents(putLogEventsParams).promise();
    log.log("Log sent to CloudWatch:", response);
  } catch (error) {
    log.error("Error sending log to CloudWatch:", error);
  }
};

// Function to get the sequence token required by CloudWatch to avoid overwriting logs
const getSequenceToken = async (
  logGroupName: string = "default-log-group",
  logStreamName: string = "default-log-stream",
) => {
  try {
    const params = {
      logGroupName: logGroupName,
      logStreamName: logStreamName,
    };
    const describeLogStreamsResponse = await cloudwatchlogs.describeLogStreams(params).promise();

    // Check if describeLogStreamsResponse.logStreams exists
    const logStreams = describeLogStreamsResponse && describeLogStreamsResponse.logStreams;
    if (logStreams && logStreams.length > 0) {
      // Retrieve the sequence token for the last log stream event
      const logStream = logStreams[0];
      return logStream.uploadSequenceToken;
    }

    // If no streams exist, return null (no sequence token needed)
    return null;
  } catch (error: any) {
    if (error.code === "ResourceNotFoundException") {
      // If the log stream does not exist, no sequence token is required
      return null;
    }
    log.error("Error getting sequence token:", error);
    return null;
  }
};

export const getBrowserLogger = ({
  logGroupName,
  logStreamName,
  level = "info",
  module,
}: LoggerConfig) => {
  return createLogger({
    logGroupName: logGroupName || "default-log-group",
    logStreamName: logStreamName || "default-log-stream",
    module,
    level,
  });
};
