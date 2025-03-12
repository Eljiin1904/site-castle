import type { DoubleBetKind } from "./DoubleBetKind";
import type { DoubleRoll } from "./DoubleRoll";

export interface DoubleResult {
  gameId: string;
  timestamp: Date;
  roundId: string;
  betKind: DoubleBetKind;
  betAmount: number;
  roll: DoubleRoll;
  eosBlockId: string;
  serverSeed: string;
}
