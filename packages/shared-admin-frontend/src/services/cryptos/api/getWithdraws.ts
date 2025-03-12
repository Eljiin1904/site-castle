import { CryptoWithdraw } from "@core/types/cryptos/CryptoWithdraw";
import { Http } from "@client/services/http";

export function getWithdraws(data: { limit: number; page: number }): Promise<{
  transactions: CryptoWithdraw[];
}> {
  return Http.post("/cryptos/get-withdraws", data);
}
