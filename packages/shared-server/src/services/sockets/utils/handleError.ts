import { ValidationError } from "yup";
import { HandledError } from "#server/services/errors";
import { RateLimitError } from "#server/services/security";
import { System } from "#server/services/system";
import config from "#server/config";

export function handleError(err: unknown, ip?: string) {
  if (err instanceof HandledError) {
    if (config.env === "development" || config.env === "devcloud") {
      console.error(err);
    }
  } else if (err instanceof ValidationError) {
    if (config.env === "development" || config.env === "devcloud") {
      console.error(err.message);
    }
  } else if (err instanceof RateLimitError) {
    if (config.env === "development" || config.env === "devcloud") {
      console.error(err);
    }
  } else if (err instanceof Error) {
    console.error(err);
    log({ message: err.message, ip });
  } else {
    console.error(err);
    log({ message: "Unknown error encountered!", ip });
  }
}

function log({ message, ip }: { message: string; ip: string | undefined }) {
  System.log({
    kind: "socket-error",
    system: config.system,
    message,
    ip,
  }).catch(console.error);
}
