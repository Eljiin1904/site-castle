import type { MarketProvider } from "./MarketProvider";

export interface MarketProviderInfo {
  provider: MarketProvider;
  enabled: boolean;
  balance: number;
}
