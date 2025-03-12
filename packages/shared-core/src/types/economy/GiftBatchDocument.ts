import type { GiftCardTag } from "./GiftCardTag";

export interface GiftBatchDocument {
  _id: string;
  timestamp: Date;
  tokenAmount: number;
  createdCount: number;
  usedCount: number;
  tag: GiftCardTag;
  lastUseDate?: Date;
}
