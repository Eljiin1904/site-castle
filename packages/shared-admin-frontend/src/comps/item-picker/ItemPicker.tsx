import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Intimal } from "@core/services/intimal";
import { Numbers } from "@core/services/numbers";
import { LootItem } from "@core/types/items/BasicItem";
import { Items } from "@core/services/items";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Input } from "@client/comps/input/Input";
import { Slider } from "@client/comps/slider/Slider";
import { SvgSort } from "@client/svgs/common/SvgSort";
import { Catalog } from "@client/comps/catalog/Catalog";
import { useDebounceState } from "@client/hooks/system/useDebounceState";
import { useErrorToast } from "@client/hooks/toasts/useErrorToast";
import { Economy } from "#app/services/economy";
import { FilterGroup } from "./FilterGroup";
import { ItemPickerCard, ItemPickerCardPlaceholder } from "./ItemPickerCard";
import "./ItemPicker.scss";

export const ItemPicker = ({
  items,
  onItemClick,
}: {
  items: LootItem[];
  onItemClick: (x: LootItem) => void;
}) => {
  const limit = 20;
  const maxValue = 500000;
  const [searchText, setSearchText] = useState<string>();
  const [searchCurrent, setSearchCurrent] = useDebounceState(
    searchText,
    setSearchText,
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxValue]);
  const [priceCurrent, setPriceCurrent] = useDebounceState(
    priceRange,
    setPriceRange,
  );
  const [sortIndex, setSortIndex] = useState(0);
  const [rarities, setRarities] = useState(Items.rarities.slice());
  const [subTypes, setSubTypes] = useState(Items.subTypes.slice());
  const [wears, setWears] = useState(Items.wears.slice());
  const [editions, setEditions] = useState(Items.editions.slice());

  const query = useInfiniteQuery({
    queryKey: [
      searchText,
      rarities,
      subTypes,
      priceRange,
      wears,
      editions,
      sortIndex,
      limit,
    ],
    queryFn: ({ pageParam: page }) =>
      Economy.getLoot({
        searchText,
        minValue: Intimal.fromDecimal(priceRange[0]),
        maxValue: Intimal.fromDecimal(priceRange[1]),
        sortIndex,
        rarities,
        subTypes,
        wears,
        editions,
        limit,
        page,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage?.items.length < limit ? undefined : pages.length + 1,
    placeholderData: (prev) => prev,
  });

  useErrorToast(query.error);

  return (
    <Div
      className="ItemPicker"
      column
      fx
      gap={16}
    >
      <Div
        column
        fx
        gap={16}
      >
        <Div
          fx
          gap={16}
        >
          <Input
            type="text"
            placeholder="Enter item name..."
            value={searchCurrent}
            onChange={setSearchCurrent}
          />
          <Dropdown
            type="select"
            icon={SvgSort}
            options={["Price Low", "Price High"]}
            value={sortIndex}
            onChange={(x, i) => setSortIndex(i)}
          />
        </Div>
        <Div
          fx
          gap={16}
        >
          <Div
            fx
            column
            gap={16}
          >
            <Div
              column
              p={16}
              gap={8}
              bg="gray-6"
              border
            >
              <Div>
                <Span>{"Value Range"}</Span>
                <Span
                  family="title"
                  weight="semi-bold"
                  size={12}
                  color="gold"
                  flexGrow
                  textAlign="right"
                >
                  {Numbers.toLocaleString(priceCurrent[0], 2)}
                  {" - "}
                  {Numbers.toLocaleString(priceCurrent[1], 2)}
                </Span>
              </Div>
              <Slider
                type="currency"
                value={priceCurrent}
                maxValue={maxValue}
                onChange={setPriceCurrent}
              />
            </Div>
            <FilterGroup
              className="rarity-filters"
              options={Items.rarities.slice()}
              actives={Items.rarities.map((x) => rarities.includes(x))}
              onChange={(actives) =>
                setRarities(Items.rarities.filter((x, i) => actives[i]))
              }
            />
          </Div>
          <FilterGroup
            options={Items.subTypes.slice()}
            actives={Items.subTypes.map((x) => subTypes.includes(x))}
            onChange={(actives) =>
              setSubTypes(Items.subTypes.filter((x, i) => actives[i]))
            }
          />
          <Div
            column
            fx
            gap={16}
          >
            <FilterGroup
              options={Items.wears.slice()}
              actives={Items.wears.map((x) => wears.includes(x))}
              onChange={(actives) =>
                setWears(Items.wears.filter((x, i) => actives[i]))
              }
            />
            <FilterGroup
              options={Items.editions.slice()}
              actives={Items.editions.map((x) => editions.includes(x))}
              onChange={(actives) =>
                setEditions(Items.editions.filter((x, i) => actives[i]))
              }
            />
          </Div>
        </Div>
      </Div>
      <Catalog
        pages={query.data?.pages?.map((x) => x.items)}
        pageSize={limit}
        isFetching={query.isFetching}
        emptyMessage="No items found."
        hasNextPage={query.hasNextPage}
        fetchNextPage={query.fetchNextPage}
        placeholderRenderer={(key) => <ItemPickerCardPlaceholder key={key} />}
        itemRenderer={(item, i) => (
          <ItemPickerCard
            key={i}
            item={item}
            disabled={items.some((other) => {
              if ("_id" in other) {
                return other._id === item.id;
              } else {
                return other.id === item.id;
              }
            })}
            onClick={() => onItemClick(item)}
          />
        )}
      />
    </Div>
  );
};
