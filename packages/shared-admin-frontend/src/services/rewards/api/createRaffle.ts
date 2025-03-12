import { RaffleDocument } from "@core/types/rewards/RaffleDocument";
import { Http } from "@client/services/http";

export function createRaffle(data: {
  displayName: string;
  itemIds: string[];
  startDate: Date;
  endDate: Date;
}): Promise<{
  raffle: RaffleDocument;
}> {
  return Http.post("/rewards/create-raffle", data);
}
