import { Http } from "@client/services/http";

export function getAuthenticatorSecret(): Promise<{
  secret: string;
  uri: string;
  recoveryKey: string;
}> {
  return Http.post("/authenticator/get-secret");
}
