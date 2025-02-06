import { MarketProvider } from "@core/types/market/MarketProvider";
import { Http } from "@client/services/http";

export function createDeposit(data: {
  inventoryId: string;
  assetId: string;
  provider: MarketProvider;
}): Promise<{
  tradeOfferId: string | undefined;
}> {
  return Http.post("/market/create-deposit", data);
}
