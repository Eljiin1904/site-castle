import { LootItem } from "@core/types/items/BasicItem";
import { Http } from "@client/services/http";

export function getLoot(data: {
  minValue: number;
  maxValue: number;
  searchText: string | undefined;
  sortIndex: number;
  rarities: string[];
  subTypes: string[];
  wears: string[];
  editions: string[];
  limit: number;
  page: number;
}): Promise<{
  items: LootItem[];
}> {
  return Http.post("/economy/get-loot", data);
}
