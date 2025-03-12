import type { DiceTargetKind } from "./DiceTargetKind";

export interface DiceResult {
  gameId: string;
  timestamp: Date;
  betAmount: number;
  targetValue: number;
  targetKind: DiceTargetKind;
  multiplier: number;
  rollValue: number;
  won: boolean;
  wonAmount: number;
  clientSeed: string;
  serverSeed?: string;
  serverSeedHashed: string;
  nonce: number;
}
