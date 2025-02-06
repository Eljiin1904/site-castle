import { AffiliateStats } from "@core/types/affiliates/AffiliateStats";
import { Http } from "@client/services/http";

export function getStats(data: { timeIndex: number }): Promise<{
  stats: AffiliateStats;
}> {
  return Http.post("/affiliates/get-stats", data);
}
