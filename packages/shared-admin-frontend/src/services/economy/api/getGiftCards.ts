import { GiftCardDocument } from "@core/types/economy/GiftCardDocument";
import { Http } from "@client/services/http";

export function getGiftCards(data: {
  batchId: string;
  limit: number;
  page: number;
}): Promise<{
  cards: GiftCardDocument[];
}> {
  return Http.post("/economy/get-gift-cards", data);
}
