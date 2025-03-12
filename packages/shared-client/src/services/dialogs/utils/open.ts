import { manager } from "../constants/manager";

export function open(kind: "primary" | "secondary", value: JSX.Element | null) {
  if (kind === "primary") {
    manager.primary = value;
  } else {
    manager.secondary = value;
  }
}
