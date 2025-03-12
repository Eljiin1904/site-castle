export interface LimboResult {
  gameId: string;
  timestamp: Date;
  betAmount: number;
  targetValue: number;
  multiplier: number;
  rollValue: number;
  rollMultiplier: number;
  won: boolean;
  wonAmount: number;
  clientSeed: string;
  serverSeed?: string;
  serverSeedHashed: string;
  nonce: number;
}
