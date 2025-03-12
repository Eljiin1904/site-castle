import type { BasicUser } from "../users/BasicUser";

export interface LimboRoll {
  _id: string;
  targetValue: number;
  rollValue: number;
  rollMultiplier: number;
  won: boolean;
}

export interface LimboFeedRoll {
  _id: string;
  betAmount: number;
  inserted?: boolean;
  targetValue: number;
  multiplier: number;
  rollValue: number;
  rollMultiplier: number;
  user: BasicUser;
  won: boolean;
  wonAmount: number;
}
