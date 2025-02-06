import { Http } from "@client/services/http";

export function getBetToken(data: { tfac: string }): Promise<{
  betToken: string;
}> {
  return Http.post("/authenticator/get-bet-token", data);
}
