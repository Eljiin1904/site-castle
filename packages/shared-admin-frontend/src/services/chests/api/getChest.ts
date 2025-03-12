import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Http } from "@client/services/http";

export function getChest(data: { chestId: string }): Promise<{
  chest: ChestDocument;
}> {
  return Http.post("/chests/get-chest", data);
}
