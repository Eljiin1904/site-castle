import { Http } from "@client/services/http";

export function disableAuthenticator(data: { userId: string }) {
  return Http.post("/users/disable-authenticator", data);
}
