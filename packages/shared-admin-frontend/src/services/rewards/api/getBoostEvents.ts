import { RewardBoostEventDocument } from "@core/types/rewards/RewardBoostEventDocument";
import { RewardBoostTimeframe } from "@core/types/rewards/RewardBoostTimeframe";
import { Http } from "@client/services/http";

export function getBoostEvents(data: {
  timeframe: RewardBoostTimeframe | undefined;
  limit: number;
  page: number;
}): Promise<{
  events: RewardBoostEventDocument[];
}> {
  return Http.post("/rewards/get-boost-events", data);
}
