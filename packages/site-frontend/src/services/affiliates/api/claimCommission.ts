import { Http } from "@client/services/http";

export function claimCommission(data: {claim: {campaignId: string, amount: number}[]}): Promise<{
  amount: number;
}> {
  return Http.post("/affiliates/claim-campaigns-commission", data);
}
