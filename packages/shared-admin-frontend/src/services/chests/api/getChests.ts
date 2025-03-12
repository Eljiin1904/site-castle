import { ChestDocument } from "@core/types/chests/ChestDocument";
import { ChestKind } from "@core/types/chests/ChestKind";
import { Http } from "@client/services/http";

export function getChests(data: {
  searchText: string | undefined;
  priceIndex: number;
  sortIndex: number;
  kind: ChestKind;
  limit: number;
  page: number;
}): Promise<{
  chests: ChestDocument[];
}> {
  return Http.post("/chests/get-chests", data);
}
