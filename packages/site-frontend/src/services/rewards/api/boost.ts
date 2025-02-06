import { RewardBoostTimeframe } from "@core/types/rewards/RewardBoostTimeframe";
import { Http } from "@client/services/http";

export function boost(data: {
  timeframe: RewardBoostTimeframe;
}): Promise<{ amount: number }> {
  return Http.post("/rewards/boost", data);
}
