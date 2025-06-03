import type {
  CrashRoundStatus,
  CrashRoundsStatusData,
} from "./CrashRoundStatus";

export type CrashRoundDocument = {
  _id: string;
  timestamp: Date;
  multiplier?: number;  
  status: CrashRoundStatus;
  statusDate: Date; 
  startDate?: Date;
  completedDate?: Date;
  eosBlockNum?: number;
  eosBlockId?: string;
  eosCommitDate?: Date;
  processed?: boolean;
  processedDate?: Date;
  won?: boolean;
} & CrashRoundsStatusData;
