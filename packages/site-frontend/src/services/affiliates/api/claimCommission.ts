import { Http } from "@client/services/http";

export function claimCommission(): Promise<{
  amount: number;
}> {
  return Http.post("/affiliates/claim-campaigns-commission");
}
