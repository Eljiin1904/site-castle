import { Http } from "@client/services/http";

export function setPendingReferral(data: {
  referralCode: string | undefined;
}): Promise<void> {
  return Http.post("/affiliates/set-pending-referral", data);
}
