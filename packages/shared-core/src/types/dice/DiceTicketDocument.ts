import type { BasicUser } from "../users/BasicUser";
import type { DiceTargetKind } from "./DiceTargetKind";

export interface DiceTicketDocument {
  _id: string;
  timestamp: Date;
  user: BasicUser;
  betAmount: number;
  targetValue: number;
  targetKind: DiceTargetKind;
  multiplier: number;
  clientSeed: string;
  serverSeed: string;
  serverSeedHashed: string;
  nonce: number;
  rollValue: number;
  won: boolean;
  wonAmount: number;
  processed?: boolean;
  processedDate?: Date;
}
