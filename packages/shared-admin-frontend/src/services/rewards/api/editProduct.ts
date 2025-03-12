import { Http } from "@client/services/http";

export function editProduct({
  productId,
  image,
  displayName,
  gemCost,
  disabled,
  featured,
}: {
  productId: string;
  image: File | undefined;
  displayName: string;
  gemCost: number;
  disabled: boolean;
  featured: boolean;
}): Promise<void> {
  const data = new FormData();

  data.append("productId", productId);

  if (image) {
    data.append("image", image);
  }

  data.append("displayName", displayName);
  data.append("gemCost", gemCost.toString());
  data.append("disabled", disabled.toString());
  data.append("featured", featured.toString());

  return Http.post("/rewards/edit-product", data);
}
