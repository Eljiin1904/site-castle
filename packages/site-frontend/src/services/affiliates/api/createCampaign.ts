import { Http } from "@client/services/http";
import { UserCampaigns } from "@core/types/users/UserCampaigns";

export function createCampaign(data: {campaignName: string, campaignId: string}): Promise<{
  campaign: UserCampaigns
}> {
  return Http.post("/affiliates/create-campaign", data);
}
