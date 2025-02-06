import { time } from "../constants/time";

export function timeSince(date: Date) {
  const adjustedTime = Date.now() + time.offset;
  return adjustedTime - date.getTime();
}
