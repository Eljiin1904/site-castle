import { RaffleDocument } from "@core/types/rewards/RaffleDocument";
import { Http } from "@client/services/http";

export function getRaffles(data: {
  searchText: string | undefined;
  sortIndex: number;
  limit: number;
  page: number;
}): Promise<{
  raffles: RaffleDocument[];
}> {
  return Http.post("/rewards/get-raffles", data);
}
