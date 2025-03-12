import type { BasicUser } from "../users/BasicUser";
import type { DiceTargetKind } from "./DiceTargetKind";

export interface DiceRoll {
  _id: string;
  targetValue: number;
  targetKind: DiceTargetKind;
  rollValue: number;
}

export interface DiceFeedRoll {
  _id: string;
  user: BasicUser;
  betAmount: number;
  targetValue: number;
  targetKind: DiceTargetKind;
  multiplier: number;
  rollValue: number;
  won: boolean;
  wonAmount: number;
  inserted?: boolean;
}
