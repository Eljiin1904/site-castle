import type { RewardBoostTimeframe } from "./RewardBoostTimeframe";

export interface RewardBoostTicketDocument {
  _id: string;
  timestamp: Date;
  userId: string;
  timeframe: RewardBoostTimeframe;
  eventId?: string;
}
