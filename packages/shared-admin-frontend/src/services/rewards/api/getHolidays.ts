import { HolidayEventDocument } from "@core/types/rewards/HolidayEventDocument";
import { Http } from "@client/services/http";

export function getHolidays(data: {
  searchText: string | undefined;
  sortIndex: number;
  limit: number;
  page: number;
}): Promise<{
  holidays: HolidayEventDocument[];
}> {
  return Http.post("/rewards/get-holidays", data);
}
