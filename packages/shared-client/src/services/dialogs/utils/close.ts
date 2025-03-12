import { manager } from "../constants/manager";

export function close(kind: "primary" | "secondary") {
  if (kind === "primary") {
    manager.primary = null;
  } else {
    manager.secondary = null;
  }
}
