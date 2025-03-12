import { Http } from "@client/services/http";

export function disableKey(data: { keyId: string }): Promise<void> {
  return Http.post("/affiliates/disable-key", data);
}
