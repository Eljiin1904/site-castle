import { manager } from "../constants/manager";

export function warning(text: string, duration: number = 5000) {
  manager.add({
    kind: "warning",
    text,
    duration,
    timestamp: new Date(),
  });
}
