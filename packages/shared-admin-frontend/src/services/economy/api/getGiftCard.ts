import { GiftCardDocument } from "@core/types/economy/GiftCardDocument";
import { Http } from "@client/services/http";

export function getGiftCard(data: { cardId: string | undefined }): Promise<{
  card: GiftCardDocument;
}> {
  return Http.post("/economy/get-gift-card", data);
}
