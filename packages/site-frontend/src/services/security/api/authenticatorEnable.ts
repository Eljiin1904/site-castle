import { Http } from "@client/services/http";

export function authenticatorEnable(data: { tfac: string }): Promise<void> {
  return Http.post("/authenticator/enable", data);
}
