import { RewardBoostEventDocument } from "@core/types/rewards/RewardBoostEventDocument";
import { RewardBoostTimeframe } from "@core/types/rewards/RewardBoostTimeframe";
import { Http } from "@client/services/http";

export function createBoostEvent(data: {
  timeframe: RewardBoostTimeframe;
  startDate: Date;
  endDate: Date;
}): Promise<{
  event: RewardBoostEventDocument;
}> {
  return Http.post("/rewards/create-boost-event", data);
}
