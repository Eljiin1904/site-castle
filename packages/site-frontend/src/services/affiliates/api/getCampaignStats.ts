import { Http } from "@client/services/http";
import { AffiliateStats } from "@core/types/affiliates/AffiliateStats";

export function getCampaignStats(data: { _id: string , timeIndex: number}): Promise<{
  stats: AffiliateStats ;
}> {
  return Http.post("/affiliates/get-campaign-stats", data);
}
