import { RewardProductDocument } from "@core/types/rewards/RewardProductDocument";
import { RewardProductKind } from "@core/types/rewards/RewardProductKind";
import { Http } from "@client/services/http";

export function createProduct({
  image,
  displayName,
  kind,
  gemCost,
  tokenAmount,
  chestId,
}: {
  image: File | undefined;
  displayName: string;
  kind: RewardProductKind;
  gemCost: number;
  tokenAmount?: number;
  chestId?: string;
}): Promise<{
  product: RewardProductDocument;
}> {
  const data = new FormData();

  if (image) {
    data.append("image", image);
  }

  data.append("displayName", displayName);
  data.append("kind", kind);
  data.append("gemCost", gemCost.toString());

  if (tokenAmount) {
    data.append("tokenAmount", tokenAmount.toString());
  }

  if (chestId) {
    data.append("chestId", chestId);
  }

  return Http.post("/rewards/create-product", data);
}
