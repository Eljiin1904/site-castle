import type { BasicUser } from "../users/BasicUser";
import type { BasicChest } from "./BasicChest";
import type { ChestItem } from "./ChestItem";
import type { ChestRoll } from "./ChestRoll";
import type { ChestSpeed } from "./ChestSpeed";

export interface ChestGameDocument {
  _id: string;
  timestamp: Date;
  user: BasicUser;
  chest: BasicChest;
  roll: ChestRoll;
  loot: ChestItem;
  speed: ChestSpeed;
  clientSeed: string;
  serverSeed: string;
  serverSeedHashed: string;
  nonce: number;
  processed?: boolean;
  processDate?: Date;
}
