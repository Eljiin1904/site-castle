import { MarketProvider } from "./MarketProvider";

export interface MarketPrice {
  provider: MarketProvider;
  usdValue: number;
  tokenValue: number;
  reference?: string;
}
