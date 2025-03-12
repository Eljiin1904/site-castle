import { BasicChest } from "@core/types/chests/BasicChest";
import { ChestDropDocument } from "@core/types/chests/ChestDropDocument";
import { ChestDropSource } from "@core/types/chests/ChestDropSource";
import { ChestItem } from "@core/types/chests/ChestItem";
import { PlayerUser } from "@core/types/users/PlayerUser";
import { Database } from "#server/services/database";
import { Ids } from "#server/services/ids";

export async function createDrop(options: {
  source: ChestDropSource;
  user: PlayerUser;
  chest: BasicChest;
  loot: ChestItem;
}) {
  const drop: ChestDropDocument = {
    _id: Ids.object(),
    timestamp: new Date(),
    ...options,
  };

  await Database.collection("chest-drops").insertOne(drop);

  return drop;
}
