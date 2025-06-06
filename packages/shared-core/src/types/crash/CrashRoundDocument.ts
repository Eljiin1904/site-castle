import type {
  CrashRoundStatus,
  CrashRoundsStatusData,
} from "./CrashRoundStatus";

/**
 * Represents a document for a crash round in the database.
 * Contains information about the round's status, timestamps, and other relevant data.
 */
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
