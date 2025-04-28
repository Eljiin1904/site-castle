import { Http } from "@client/services/http";
import { UserCampaigns } from "@core/types/users/UserCampaigns";

export function getCampaigns(data: { limit: number , page: number}): Promise<{
  campaigns: UserCampaigns[];
}> {
  return Http.post("/affiliates/get-campaigns", data);
}
