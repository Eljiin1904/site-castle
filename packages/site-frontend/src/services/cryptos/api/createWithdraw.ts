import { Http } from "@client/services/http";

export function createWithdraw(data: {
  quoteId: string;
  tfac?: string;
}): Promise<void> {
  return Http.post("/cryptos/create-withdraw", data);
}
