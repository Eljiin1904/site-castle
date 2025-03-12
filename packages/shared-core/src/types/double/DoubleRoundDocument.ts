import type { DoubleRoll } from "./DoubleRoll";
import type {
  DoubleRoundStatus,
  DoubleRoundsStatusData,
} from "./DoubleRoundStatus";

export type DoubleRoundDocument = {
  _id: string;
  timestamp: Date;
  serverSeed: string;
  serverSeedHash: string;
  status: DoubleRoundStatus;
  statusDate: Date;
  roll?: DoubleRoll;
  eosBlockNum?: number;
  eosBlockId?: string;
  processed?: boolean;
  processedDate?: Date;
} & DoubleRoundsStatusData;
