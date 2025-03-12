import type { BasicItem } from "../items/BasicItem";
import type { MarketPrice } from "./MarketPrice";

export interface MarketInventoryDocument {
  _id: string;
  timestamp: Date;
  userId: string;
  items: MarketInventoryItem[];
  expires: Date;
}

export interface MarketInventoryItem extends BasicItem {
  marketHashName: string;
  assetId: string;
  prices: MarketPrice[];
  bestPrice: number;
}
