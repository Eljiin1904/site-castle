import { endOfDay, isSameDay, startOfDay, subDays } from "date-fns";
import { fromZonedTime } from "date-fns-tz";

export function toUtc(date: Date) {
  return fromZonedTime(date, "UTC");
}

export function isSameDayUtc(dateA: Date, dateB: Date) {
  const aUtc = toUtc(dateA);
  const bUtc = toUtc(dateB);

  return isSameDay(aUtc, bUtc);
}

export function isTodayUtc(date: Date) {
  return isSameDayUtc(date, new Date());
}

export function isYesterdayUtc(date: Date) {
  return isSameDayUtc(date, subDays(new Date(), 1));
}

export function startOfDayUtc(date: Date) {
  return toUtc(startOfDay(date));
}

export function endOfDayUtc(date: Date) {
  return toUtc(endOfDay(date));
}
