import type { BasicItem } from "../items/BasicItem";
import type { MarketProvider } from "./MarketProvider";

export interface MarketItem extends BasicItem {
  marketHashName: string;
  provider: MarketProvider;
  externalId: string;
  usdValue: number;
  tokenValue: number;
  reference?: string;
}
