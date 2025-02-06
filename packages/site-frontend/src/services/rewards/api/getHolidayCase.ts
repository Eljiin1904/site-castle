import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Http } from "@client/services/http";

export function getHolidayCase(data: { slug: string }): Promise<{
  chest: ChestDocument;
  holidayCost: number;
}> {
  return Http.post("/rewards/get-holiday-case", data);
}
