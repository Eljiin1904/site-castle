import { ChestReport } from "@core/types/chests/ChestReport";
import { aggregateReport } from "./aggregateReport";

export async function aggregateReports({
  chestIds,
  minDate,
  maxDate,
}: {
  chestIds: string[];
  minDate: Date;
  maxDate: Date;
}): Promise<ChestReport[]> {
  const reports = await Promise.all(
    chestIds.map((chestId) => aggregateReport({ chestId, minDate, maxDate })),
  );

  return reports;
}
