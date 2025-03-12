import { Http } from "@client/services/http";

export function logout() {
  return Http.post("/auth/logout");
}
