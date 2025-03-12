import { Errors } from "#client/services/errors";
import { manager } from "../constants/manager";

export function error(err: unknown, duration: number = 8000) {
  manager.add({
    kind: "error",
    text: Errors.getMessage(err),
    duration,
    timestamp: new Date(),
  });

  console.error(err);
}
