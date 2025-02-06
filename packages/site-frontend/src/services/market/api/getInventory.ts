import { Http } from "@client/services/http";
import { MarketInventoryItem } from "@core/types/market/MarketInventoryDocument";

export async function getInventory(): Promise<{
  inventoryId: string;
  items: MarketInventoryItem[];
}> {
  return await Http.post("/market/get-inventory");
}
