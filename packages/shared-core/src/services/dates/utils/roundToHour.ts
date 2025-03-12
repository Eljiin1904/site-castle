export function roundToHour(date: Date) {
  date = new Date(date);

  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
}
