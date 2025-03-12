import { addDays, differenceInDays, isFuture } from "date-fns";

export function getNextAdventDate({ resetDate }: { resetDate: Date }) {
  const now = new Date();

  if (isFuture(resetDate)) {
    return new Date(resetDate);
  }

  const daysSinceStart = differenceInDays(now, resetDate);
  const next = addDays(resetDate, 1 + daysSinceStart);

  return next;
}
