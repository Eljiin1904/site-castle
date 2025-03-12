import { Http } from "@client/services/http";

export function disableChest(data: { chestId: string }) {
  return Http.post("/chests/disable-chest", data);
}
