import { ChestItemOptions } from "@core/types/chests/ChestItem";
import { ChestKind } from "@core/types/chests/ChestKind";
import { Http } from "@client/services/http";

export function updateChest({
  chestId,
  image,
  displayName,
  items,
}: {
  chestId: string;
  image: File | undefined;
  displayName: string;
  items: ChestItemOptions[];
}) {
  const data = new FormData();

  if (image) {
    data.append("image", image);
  }

  data.append("chestId", chestId);
  data.append("displayName", displayName);
  data.append("items", JSON.stringify(items));

  return Http.post("/chests/update-chest", data);
}
