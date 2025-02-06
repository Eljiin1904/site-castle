import { RewardBoostTimeframe } from "@core/types/rewards/RewardBoostTimeframe";
import { Http } from "@client/services/http";

export type BoostDates = Record<
  RewardBoostTimeframe,
  {
    startDate: Date;
    endDate?: Date;
  }
>;

export function getBoostDates(): Promise<BoostDates> {
  return Http.post("/rewards/get-boost-dates");
}
