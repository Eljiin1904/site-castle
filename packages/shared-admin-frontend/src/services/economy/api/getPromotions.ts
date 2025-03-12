import { PromotionCodeDocument } from "@core/types/economy/PromotionCodeDocument";
import { Http } from "@client/services/http";

export function getPromotions(data: {
  searchText: string | undefined;
  sortIndex: number;
  limit: number;
  page: number;
}): Promise<{
  promotions: PromotionCodeDocument[];
}> {
  return Http.post("/economy/get-promotions", data);
}
