import { MarketItemDocument } from "@core/types/market/MarketItemDocument";
import { ItemSubType } from "@core/types/items/ItemSubType";
import { MarketProvider } from "@core/types/market/MarketProvider";
import { ItemWear } from "@core/types/items/ItemWear";
import { Http } from "@client/services/http";

export async function getMarket(data: {
  searchText: string | undefined;
  minPrice: number;
  maxPrice: number;
  subType: ItemSubType | undefined;
  wear: ItemWear | undefined;
  provider: MarketProvider | undefined;
  sortIndex: number;
  limit: number;
  page: number;
}): Promise<{
  items: MarketItemDocument[];
}> {
  return await Http.post("/market/get-market", data);
}
