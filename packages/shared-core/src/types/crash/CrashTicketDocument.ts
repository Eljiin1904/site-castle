import type { BasicUser } from "../users/BasicUser";
import { UserLocation } from "../users/UserLocation";

/**
 * Represents a document for a crash bet in the database.
 * Contains information about the bet's status, timestamps, user details and the round it belongs to.
 * It also represents a future round ticket for the next crash round. Will be store in a different collection.
 * and move to the tickets collection when the round starts.
 */
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