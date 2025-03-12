import { Database } from "#server/services/database";

export async function getActiveHoliday() {
  const holiday = await Database.collection("holiday-events").findOne({
    endDate: { $gte: new Date() },
    startDate: { $lte: new Date() },
  });

  return holiday;
}
