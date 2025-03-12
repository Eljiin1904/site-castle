import { HolidayChestOptions } from "@core/types/rewards/HolidayChest";
import { HolidayEventDocument } from "@core/types/rewards/HolidayEventDocument";
import { Http } from "@client/services/http";

export function createHoliday(data: {
  displayName: string;
  currencyRate: number;
  raffleRate: number;
  chests: HolidayChestOptions[];
  startDate: Date;
  endDate: Date;
  adventResetDate: Date;
  adventBonusDays: number[];
}): Promise<{ holiday: HolidayEventDocument }> {
  return Http.post("/rewards/create-holiday", data);
}
