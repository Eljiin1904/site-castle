import { Http } from "@client/services/http";

export function confirmDeposit(data: { transactionId: string }): Promise<void> {
  return Http.post("/cryptos/confirm-deposit", data);
}
