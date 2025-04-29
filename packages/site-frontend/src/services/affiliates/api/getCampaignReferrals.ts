import { Http } from "@client/services/http";
import { AffiliateReportWithMeta } from "@core/types/affiliates/AffiliateReport";

export function getCampaignReferrals(data: { campaignId: string, limit: number , page: number, sortIndex: number, timeIndex: number}): Promise<{
  referrals: AffiliateReportWithMeta[];
  total: number;
}> {
  return Http.post("/affiliates/get-campaign-referrals", data);
}
