import type { BasicUser } from "../users/BasicUser";
import type { UserLocation } from "../users/UserLocation";

export interface ChatRainTicketDocument {
  _id: string;
  timestamp: Date;
  rainId: string;
  user: BasicUser;
  location: UserLocation;
  stats: ChatRainTicketStats;
  splitAmount?: number;
  processed?: boolean;
  processDate?: Date;
}

export interface ChatRainTicketStats {
  level: number;
  kycTier: number;
  xpGained: number;
  depositAmount: number;
  wagerAmount: number;
}
