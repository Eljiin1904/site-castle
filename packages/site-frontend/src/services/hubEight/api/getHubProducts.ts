import { Http } from "@client/services/http";

export function getProductList() {
  return Http.post("/hub-eight/games/products");
}
