import type { ItemLikeDocument } from "../items/ItemLikeDocument";
import type { MarketProvider } from "./MarketProvider";

export interface MarketItemDocument extends ItemLikeDocument {
  provider: MarketProvider;
  externalId: string;
  tokenValue: number;
  usdValue: number;
  reference?: string;
  lastSyncDate: Date;
}
