import type { BasicUser } from "../users/BasicUser";

export interface LimboTicketDocument {
  _id: string;
  timestamp: Date;
  user: BasicUser;
  betAmount: number;
  targetValue: number;
  multiplier: number;
  clientSeed: string;
  serverSeed: string;
  serverSeedHashed: string;
  nonce: number;
  rollValue: number;
  rollMultiplier: number;
  won: boolean;
  wonAmount: number;
  processed?: boolean;
  processedDate?: Date;
}
