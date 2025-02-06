import { useQuery } from "@tanstack/react-query";
import { Strings } from "@core/services/strings";
import { ItemSubType } from "@core/types/items/ItemSubType";
import { MarketProvider } from "@core/types/market/MarketProvider";
import { ItemWear } from "@core/types/items/ItemWear";
import { Market } from "#app/services/market";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export function useInventory({
  searchText,
  minPrice,
  maxPrice,
  subType,
  wear,
  provider,
  sortIndex,
}: {
  searchText: string | undefined;
  minPrice: number;
  maxPrice: number;
  subType: ItemSubType | undefined;
  wear: ItemWear | undefined;
  provider: MarketProvider | undefined;
  sortIndex: number;
}) {
  const steamId = useAppSelector((x) => x.user.steamId);
  const tradeUrl = useAppSelector((x) => x.user.meta.steamTradeUrl);

  const enabled = !!steamId && !!tradeUrl;

  const query = useQuery({
    enabled,
    queryKey: [],
    queryFn: () => Market.getInventory(),
    placeholderData: (prev) => prev,
  });

  const inventoryId = query.data?.inventoryId || "";
  let items = query.data?.items.slice() || [];

  if (sortIndex === 0) {
    items.sort((a, b) => b.bestPrice - a.bestPrice);
  } else if (sortIndex === 1) {
    items.sort((a, b) => a.bestPrice - b.bestPrice);
  } else if (sortIndex === 2) {
    items.sort((a, b) => a.baseName.localeCompare(b.baseName));
  } else if (sortIndex === 3) {
    items.sort((a, b) => b.baseName.localeCompare(a.baseName));
  }

  if (searchText) {
    const search = Strings.toSlug(searchText);
    items = items.filter((x) =>
      Strings.toSlug(x.marketHashName).includes(search),
    );
  }

  items = items.filter(
    (x) => x.bestPrice >= minPrice && x.bestPrice <= maxPrice,
  );

  if (subType) {
    items = items.filter((x) => x.subType === subType);
  }

  if (wear) {
    items = items.filter((x) => x.wear === wear);
  }

  if (provider) {
    items = items.filter((x) => x.prices[0].provider === provider);
  }

  return { query, items, inventoryId };
}
