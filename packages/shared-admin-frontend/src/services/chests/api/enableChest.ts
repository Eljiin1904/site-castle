import { Http } from "@client/services/http";

export function enableChest(data: { chestId: string }) {
  return Http.post("/chests/enable-chest", data);
}
