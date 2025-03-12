import type { MarketPrice } from "../market/MarketPrice";

export interface ItemMarketData {
  prices: MarketPrice[];
  bestPrice: number;
  lastSyncDate: Date;
  available: boolean;
}
