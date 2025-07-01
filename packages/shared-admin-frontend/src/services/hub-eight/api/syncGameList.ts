import { Http } from "@client/services/http";

export function syncGameList() {
  return Http.post("/hub-eight/games/sync");
}
