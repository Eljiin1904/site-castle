import { RaceDocument } from "@core/types/rewards/RaceDocument";
import { Database } from "#server/services/database";

export async function getActiveRaces(
  projection?: Partial<Record<keyof RaceDocument, 0 | 1>>,
) {
  let races = await Database.collection("races").find(
    {
      endDate: { $gte: new Date() },
      startDate: { $lte: new Date() },
      kind: { $ne: "holiday" },
    },
    {
      projection,
    },
  ).toArray();

  if (!races.length) {
    races = await Database.collection("races").find(
      {
        endDate: { $lte: new Date() },
        kind: { $ne: "holiday" },
      },
      {
        sort: { endDate: -1 },
        projection,
      },
    ).toArray();
  }

  return races;
}
