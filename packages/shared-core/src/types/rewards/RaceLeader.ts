import type { BasicUser } from "../users/BasicUser";

export interface RaceLeader {
  user: BasicUser;
  rank: number;
  wagerAmount: number;
  xpGained: number;
  prizeAmount: number;
}
