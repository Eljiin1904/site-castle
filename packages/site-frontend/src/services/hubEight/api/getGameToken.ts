import { Http } from "@client/services/http";

export function getGameToken() {
  return Http.post("/hub-eight/test/token");
}
