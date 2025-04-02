import type { BasicUser } from "../users/BasicUser";

export interface MinesEventDocument {
  _id: string;
  gameId: string;
  user: BasicUser;
  gridSize: number;
  mineCount: number;
  revealCount: number;
  won: boolean;
  wonAmount: number;
  multiplier: number;
  inserted?: boolean;
}
