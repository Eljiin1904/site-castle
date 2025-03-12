import type { RewardBoostTimeframe } from "./RewardBoostTimeframe";

export interface RewardBoostEventDocument {
  _id: string;
  timeframe: RewardBoostTimeframe;
  startDate: Date;
  endDate: Date;
}
