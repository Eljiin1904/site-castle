import { ChestItemOptions } from "@core/types/chests/ChestItem";
import { ChestKind } from "@core/types/chests/ChestKind";
import { Http } from "@client/services/http";

export function createChest({
  image,
  displayName,
  kind,
  items,
}: {
  image: File | undefined;
  displayName: string;
  kind: ChestKind;
  items: ChestItemOptions[];
}): Promise<{
  chestId: string;
}> {
  const data = new FormData();

  if (image) {
    data.append("image", image);
  }

  data.append("displayName", displayName);
  data.append("kind", kind);
  data.append("items", JSON.stringify(items));

  return Http.post("/chests/create-chest", data);
}
