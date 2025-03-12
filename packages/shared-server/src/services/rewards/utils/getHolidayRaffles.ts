import { Database } from "#server/services/database";
import { Site } from "#server/services/site";

export async function getHolidayRaffles() {
  const { holiday } = await Site.meta.cache();

  if (!holiday) {
    return [];
  }

  const raffles = await Database.collection("raffles")
    .find(
      {
        startDate: { $gte: holiday.startDate },
        endDate: { $lte: holiday.endDate },
      },
      {
        sort: { endDate: 1 },
      },
    )
    .toArray();

  return raffles;
}
