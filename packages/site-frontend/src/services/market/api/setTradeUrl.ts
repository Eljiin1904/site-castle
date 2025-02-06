import { Http } from "@client/services/http";

export function setTradeUrl(data: { tradeUrl: string }): Promise<void> {
  return Http.post("/market/set-trade-url", data);
}
