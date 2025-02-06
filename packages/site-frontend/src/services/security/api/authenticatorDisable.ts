import { Http } from "@client/services/http";

export function authenticatorDisable(data: { tfac: string }): Promise<void> {
  return Http.post("/authenticator/disable", data);
}
