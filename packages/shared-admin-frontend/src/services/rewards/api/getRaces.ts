import { RaceDocument } from "@core/types/rewards/RaceDocument";
import { Http } from "@client/services/http";

export function getRaces(data: {
  searchText: string | undefined;
  searchIndex: number;
  sortIndex: number;
  limit: number;
  page: number;
}): Promise<{
  races: RaceDocument[];
}> {
  return Http.post("/rewards/get-races", data);
}
