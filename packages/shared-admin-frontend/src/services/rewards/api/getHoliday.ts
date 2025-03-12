import { HolidayEventDocument } from "@core/types/rewards/HolidayEventDocument";
import { Http } from "@client/services/http";

export function getHoliday(data: { holidayId: string }): Promise<{
  holiday: HolidayEventDocument;
}> {
  return Http.post("/rewards/get-holiday", data);
}
