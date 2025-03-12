import type { PlayerUser } from "../users/PlayerUser";
import type { BasicChest } from "./BasicChest";
import type { ChestItem } from "./ChestItem";
import type { ChestDropSource } from "./ChestDropSource";

export interface ChestDropDocument {
  _id: string;
  timestamp: Date;
  user: PlayerUser;
  source: ChestDropSource;
  chest: BasicChest;
  loot: ChestItem;
}
