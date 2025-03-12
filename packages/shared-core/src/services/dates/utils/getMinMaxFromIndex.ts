import { startOfDay, startOfWeek, startOfMonth, startOfYear } from "date-fns";

export function getMinMaxFromIndex({
  timeIndex,
  minDate,
  maxDate,
}: {
  timeIndex: number;
  minDate?: Date;
  maxDate?: Date;
}) {
  minDate = minDate ?? new Date(0);
  maxDate = maxDate ?? new Date();

  if (timeIndex === 0) {
    minDate = startOfDay(Date.now());
    maxDate = new Date();
  } else if (timeIndex === 1) {
    minDate = startOfWeek(Date.now());
    maxDate = new Date();
  } else if (timeIndex === 2) {
    minDate = startOfMonth(Date.now());
    maxDate = new Date();
  } else if (timeIndex === 3) {
    minDate = startOfYear(Date.now());
    maxDate = new Date();
  } else if (timeIndex === 4) {
    minDate = new Date(0);
    maxDate = new Date();
  } else {
    minDate = new Date(minDate);
    minDate.setUTCHours(0);
    minDate.setUTCMinutes(0);
    minDate.setUTCSeconds(0);
    minDate.setUTCMilliseconds(0);

    maxDate = new Date(maxDate);
    maxDate.setUTCHours(23);
    maxDate.setUTCMinutes(59);
    maxDate.setUTCSeconds(59);
    maxDate.setUTCMilliseconds(999);
  }

  return { minDate, maxDate };
}
