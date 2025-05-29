import type { BasicUser } from "../users/BasicUser";
import { UserLocation } from "../users/UserLocation";

export interface CrashTicketDocument {
  _id: string;
  timestamp: Date;
  roundId: string;
  multiplierCrashed?: number;
  crashedDate?: Date;
  user: BasicUser;
  betAmount: number;
  processed?: boolean;
  processedDate?: Date;
  won?: boolean;
  wonAmount?: number;
  cashoutTriggered?: boolean;
  cashoutTriggeredDate?: Date;
  latency?: number;
  gameStartTime?: number;
  targetMultiplier?: number;
  autoCashedTriggered?: boolean;
  location?: UserLocation; // Added for next round tickets
}