import config from "#server/config";
import { isAxiosError } from "axios";
import { log } from "./log";

export function handleError(err: unknown) {
  if (isAxiosError(err)) {
    console.error(`AxiosError: ${err.message}`);
    console.error(err.response?.data);
    logError({ message: err.message });
  } else if (err instanceof Error) {
    console.error(err);
    logError({ message: err.message });
  } else {
    console.error(err);
    logError({ message: "Unknown error encountered!" });
  }
}

function logError({ message }: { message: string }) {
  log({
    kind: "server-error",
    system: config.system,
    message,
  }).catch(console.error);
}
