import { GiftBatchDocument } from "@core/types/economy/GiftBatchDocument";
import { Http } from "@client/services/http";

export function getGiftBatches(data: {
  searchText: string | undefined;
  sortIndex: number;
  limit: number;
  page: number;
}): Promise<{
  batches: GiftBatchDocument[];
}> {
  return Http.post("/economy/get-gift-batches", data);
}
