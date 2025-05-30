export interface CrashMultiplierDocument {
  _id: string;
  timestamp: Date;
  roundId: string;
  multiplier: number;
  serverSeed: string;
  serverSeedHash: string;
  won?: boolean;
  roundTime: number;
}