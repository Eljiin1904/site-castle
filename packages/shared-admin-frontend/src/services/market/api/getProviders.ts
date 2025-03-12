import { MarketProviderInfo } from "@core/types/market/MarketProviderInfo";
import { Http } from "@client/services/http";

export function getProviders(): Promise<{
  providers: MarketProviderInfo[];
}> {
  return Http.post("/market/get-providers");
}
