import type {
  CrashRoundStatus,
  CrashRoundsStatusData,
} from "./CrashRoundStatus";
import { CrashRoundEvent } from "./CrashRoundEvent";

export type CrashRoundDocument = {
  _id: string;
  timestamp: Date;
  serverSeed: string;
  serverSeedHash: string;
  multiplierCrash?: number;  
  status: CrashRoundStatus;
  statusDate: Date; 
  eosBlockNum?: number;
  eosBlockId?: string;
  processed?: boolean;
  processedDate?: Date;
  events: CrashRoundEvent[];
} & CrashRoundsStatusData;
