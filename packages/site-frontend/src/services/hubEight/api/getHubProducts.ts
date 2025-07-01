import { Http } from "@client/services/http";

export function getProductList(): Promise<{products: {product: string,count: number}[]}> {
  return Http.post("/hub-eight/games/products");
}