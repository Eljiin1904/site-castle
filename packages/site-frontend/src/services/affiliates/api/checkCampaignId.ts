import { Http } from "@client/services/http";

export function checkCampaignId(data: { campaignId: string }): Promise<{
  isAvailable: boolean;
}> {
  return Http.post("/affiliates/check-campaign-id", data);
}