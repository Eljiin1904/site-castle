import { Http } from "@client/services/http";
import { ExternalGameCategory } from "@core/types/hub-eight/GameInformation";

interface GameProductsRequest {
  category?: ExternalGameCategory;
}

export function getProductList(data:GameProductsRequest): Promise<{products: {product: string,count: number}[]}> {
  return Http.post("/hub-eight/games/products", data);
}