import { Http } from "@client/services/http";

export function approveWithdraw(data: {
  transactionId: string;
}): Promise<void> {
  return Http.post("/market/approve-withdraw", data);
}
