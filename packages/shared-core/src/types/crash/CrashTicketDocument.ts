import type { BasicUser } from "../users/BasicUser";

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
  currentEvent?: string;
  currentEventDate?: Date;
}
// Add security and bot detection fields
// fields like:
// - ip
// - userAgent
// - country
// - device
// - os
// - browser