import { Http } from "@client/services/http";

export function cancelWithdraw(data: { transactionId: string }): Promise<void> {
  return Http.post("/cryptos/cancel-withdraw", data);
}
