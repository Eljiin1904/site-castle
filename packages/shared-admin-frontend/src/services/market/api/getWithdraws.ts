import { SkinWithdraw } from "@core/types/market/SkinWithdraw";
import { Http } from "@client/services/http";

export function getWithdraws(data: { limit: number; page: number }): Promise<{
  transactions: SkinWithdraw[];
}> {
  return Http.post("/market/get-withdraws", data);
}
