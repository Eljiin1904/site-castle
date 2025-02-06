import { RewardProductDocument } from "@core/types/rewards/RewardProductDocument";
import { Http } from "@client/services/http";

export function getProducts(): Promise<{
  products: RewardProductDocument[];
}> {
  return Http.post("/rewards/get-products");
}
