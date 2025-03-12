import type { BasicUser } from "../users/BasicUser";
import type { SiteGame } from "./SiteGame";

export interface SiteBetDocument {
  _id: string;
  timestamp: Date;
  user: BasicUser;
  game: SiteGame;
  betAmount: number;
  won: boolean;
  wonAmount: number;
  multiplier: number;
}
