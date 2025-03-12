import { manager } from "../constants/manager";

export function info(text: string, duration: number = 5000) {
  manager.add({
    kind: "info",
    text,
    duration,
    timestamp: new Date(),
  });
}
