import { Database } from "#server/services/database";

export async function getHolidayRace() {
  const race = await Database.collection("races").findOne(
    {
      kind: "holiday",
    },
    {
      sort: { endDate: -1 },
    },
  );

  return race;
}
