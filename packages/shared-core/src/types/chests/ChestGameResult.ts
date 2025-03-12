import type { BasicChest } from "./BasicChest";
import type { ChestItem } from "./ChestItem";

export interface ChestGameResult {
  gameId: string;
  timestamp: Date;
  chest: BasicChest;
  loot: ChestItem;
  roll: number;
  clientSeed: string;
  serverSeed?: string;
  serverSeedHashed: string;
  nonce: number;
}
