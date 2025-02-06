import { AffiliateLeader } from "@core/types/affiliates/AffiliateLeader";
import { Http } from "@client/services/http";

export function getDashboard(): Promise<{
  leaders: AffiliateLeader[];
}> {
  return Http.post("/affiliates/get-dashboard");
}
