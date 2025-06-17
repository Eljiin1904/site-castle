

export interface CrashResult {
  gameId: string;
  timestamp: Date;
  roundId: string;
  betAmount: number;
  cashoutMultiplier?: number;
  multiplier: number;
  won: boolean;
  wonAmount: number;
  clientHash: string;
  serverHash: string;
}
