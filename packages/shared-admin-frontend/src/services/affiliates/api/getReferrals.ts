import { AffiliateReportWithMeta } from "@core/types/affiliates/AffiliateReport";
import { Http } from "@client/services/http";

export function getReferrals(data: {
  affiliateId: string;
  timeIndex: number;
  sortIndex: number;
  limit: number;
  page: number;
}): Promise<{
  referrals: AffiliateReportWithMeta[];
}> {
  return Http.post("/affiliates/get-referrals", data);
}
