import { differenceInDays, isFuture } from "date-fns";

export function getAdventDay({ resetDate }: { resetDate: Date }) {
  const now = new Date();

  if (isFuture(resetDate)) {
    return 0;
  }

  const daysSinceStart = differenceInDays(now, resetDate);

  return daysSinceStart + 1;
}
