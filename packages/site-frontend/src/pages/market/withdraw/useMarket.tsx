import { useInfiniteQuery } from "@tanstack/react-query";
import { ItemSubType } from "@core/types/items/ItemSubType";
import { ItemWear } from "@core/types/items/ItemWear";
import { MarketProvider } from "@core/types/market/MarketProvider";
import { Market } from "#app/services/market";

export function useMarket({
  searchText,
  minPrice,
  maxPrice,
  subType,
  wear,
  provider,
  sortIndex,
  limit,
}: {
  searchText: string | undefined;
  minPrice: number;
  maxPrice: number;
  subType: ItemSubType | undefined;
  wear: ItemWear | undefined;
  provider: MarketProvider | undefined;
  sortIndex: number;
  limit: number;
}) {
  const query = useInfiniteQuery({
    queryKey: [
      "market",
      searchText,
      minPrice,
      maxPrice,
      subType,
      wear,
      provider,
      sortIndex,
      limit,
    ],
    queryFn: ({ pageParam: page }) =>
      Market.getMarket({
        searchText,
        minPrice,
        maxPrice,
        subType,
        wear,
        provider,
        sortIndex,
        limit,
        page,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage?.items.length < limit ? undefined : pages.length + 1,
    placeholderData: (prev) => prev,
  });

  const pages = query.data?.pages?.map((x) => x.items);

  return { query, pages };
}
