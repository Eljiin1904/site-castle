import { manager } from "../constants/manager";

export function success(text: string, duration: number = 5000, data?: any) {
  manager.add({
    kind: "success",
    text,
    duration,
    timestamp: new Date(),
    data
  });
}
