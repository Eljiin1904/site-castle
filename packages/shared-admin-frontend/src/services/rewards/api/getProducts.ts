import { RewardProductDocument } from "@core/types/rewards/RewardProductDocument";
import { RewardProductKind } from "@core/types/rewards/RewardProductKind";
import { Http } from "@client/services/http";

export function getProducts(data: {
  searchText: string | undefined;
  kind: RewardProductKind | undefined;
  sortIndex: number;
  limit: number;
  page: number;
}): Promise<{
  products: RewardProductDocument[];
}> {
  return Http.post("/rewards/get-products", data);
}
