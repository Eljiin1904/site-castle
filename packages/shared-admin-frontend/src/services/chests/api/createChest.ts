import { ChestItemOptions } from "@core/types/chests/ChestItem";
import { ChestKind } from "@core/types/chests/ChestKind";
import { Http } from "@client/services/http";

export function createChest({
  edgeRate,
  image,
  displayName,
  kind,
  tierXp,
  levelRequirement,
  annualValue,
  items,
}: {
  edgeRate: number;
  image: File | undefined;
  displayName: string;
  kind: ChestKind;
  tierXp?: number;
  levelRequirement?: number;
  annualValue?: number;
  items: ChestItemOptions[];
}): Promise<{
  chestId: string;
}> {
  console.log("Creating....");
  const data = new FormData();

  if (image) {
    data.append("image", image);
  }

  data.append("edgeRate", edgeRate.toString());
  data.append("displayName", displayName);
  data.append("kind", kind);

  if (tierXp) {
    data.append("tierXp", tierXp.toString());
  }
  if (levelRequirement) {
    data.append("levelRequirement", levelRequirement.toString());
  }
  if (annualValue) {
    data.append("annualValue", annualValue.toString());
  }

  data.append("items", JSON.stringify(items));

  return Http.post("/chests/create-chest", data);
}
