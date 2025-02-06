import { Http } from "@client/services/http";

export function buyProduct(data: { productId: string }): Promise<void> {
  return Http.post("/rewards/buy-product", data);
}
