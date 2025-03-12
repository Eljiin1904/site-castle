import { ErrorRequestHandler } from "express";
import { ValidationError } from "yup";
import { isAxiosError } from "axios";
import { HandledError } from "#server/services/errors";
import { RateLimitError } from "#server/services/security";
import { System } from "#server/services/system";
import config from "#server/config";

export const appErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HandledError) {
    if (config.env === "development" || config.env === "devcloud") {
      console.error(err);
    }
    if (!res.headersSent) {
      res.status(400).json({ error: err.message });
    }
  } else if (err instanceof ValidationError) {
    if (config.env === "development" || config.env === "devcloud") {
      console.error(err.message);
    }
    if (!res.headersSent) {
      res.status(400).json({ error: err.message });
    }
  } else if (err instanceof RateLimitError) {
    if (config.env === "development" || config.env === "devcloud") {
      console.error(err);
    }
    if (!res.headersSent) {
      res.status(429).json({ error: err.message });
    }
  } else if (isAxiosError(err)) {
    console.error(`AxiosError: ${err.message}`);
    console.error(err.response?.data);

    log({ message: err.message, ip: req.trueIP });

    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    }
  } else if (err instanceof Error) {
    console.error(err);

    log({ message: err.message, ip: req.trueIP });

    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    }
  } else {
    console.error(err);

    log({ message: "Unknown error encountered!", ip: req.trueIP });

    if (!res.headersSent) {
      res.status(500).json({ error: "Unknown error." });
    }
  }
};

function log({ message, ip }: { message: string; ip: string | undefined }) {
  System.log({
    kind: "http-error",
    system: config.system,
    ip,
    message,
  }).catch(console.error);
}
