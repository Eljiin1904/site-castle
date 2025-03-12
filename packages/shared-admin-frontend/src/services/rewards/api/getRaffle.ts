import { RaffleDocument } from "@core/types/rewards/RaffleDocument";
import { Http } from "@client/services/http";

export function getRaffle(data: { raffleId: string }): Promise<{
  raffle: RaffleDocument;
}> {
  return Http.post("/rewards/get-raffle", data);
}
