export interface MinesResult {
  gameId: string;
  timestamp: Date;
  betAmount: number;
  gridSize: number;
  mineCount: number;
  revealCount: number;
  won: boolean;
  wonAmount: number;
  multiplier: number;
  clientSeed: string;
  serverSeed?: string;
  serverSeedHashed: string;
  nonce: number;
}
