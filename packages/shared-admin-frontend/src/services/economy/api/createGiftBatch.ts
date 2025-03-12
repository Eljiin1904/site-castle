import { GiftCardTag } from "@core/types/economy/GiftCardTag";
import { Http } from "@client/services/http";

export function createGiftBatch(data: {
  batchId: string;
  batchSize: number;
  tokenAmount: number;
  tag: GiftCardTag;
}) {
  return Http.post("/economy/create-gift-batch", data);
}
