import { BasicChest } from "#core/types/chests/BasicChest";
import { ChestDocument } from "#core/types/chests/ChestDocument";

export function getBasicChest(chest: ChestDocument): BasicChest {
  return {
    id: chest._id,
    slug: chest.slug,
    kind: chest.kind,
    displayName: chest.displayName,
    imageId: chest.imageId,
    openCost: chest.openCost,
  };
}
