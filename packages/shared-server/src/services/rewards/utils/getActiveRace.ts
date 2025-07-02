import { RaceDocument } from "@core/types/rewards/RaceDocument";
import { Database } from "#server/services/database";

export async function getActiveRace(
  slug: string,
  projection?: Partial<Record<keyof RaceDocument, 0 | 1>>,
) {
  let race = await Database.collection("races").findOne(
    {
      endDate: { $gte: new Date() },
      startDate: { $lte: new Date() },
      slug,
      kind: { $ne: "holiday" },
    },
    {
      projection,
    },
  );

  if (!race) {
    race = await Database.collection("races").findOne(
      {
        endDate: { $lte: new Date() },
        kind: { $ne: "holiday" },
      },
      {
        sort: { endDate: -1 },
        projection,
      },
    );
  }

  return race;
}
