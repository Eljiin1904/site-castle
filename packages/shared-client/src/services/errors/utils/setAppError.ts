import { manager } from "../constants/manager";

export function setAppError(error: unknown) {
  manager.error = error;
}
