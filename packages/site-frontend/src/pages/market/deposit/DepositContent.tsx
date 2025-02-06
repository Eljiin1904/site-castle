import { Fragment, useState } from "react";
import { ItemSubType } from "@core/types/items/ItemSubType";
import { ItemWear } from "@core/types/items/ItemWear";
import { MarketProvider } from "@core/types/market/MarketProvider";
import { Intimal } from "@core/services/intimal";
import { Div } from "@client/comps/div/Div";
import { PageNotice } from "@client/comps/page/PageNotice";
import { Errors } from "@client/services/errors";
import { PageLoading } from "@client/comps/page/PageLoading";
import { Dialogs } from "@client/services/dialogs";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { MarketDepositModal } from "#app/modals/market/MarketDepositModal";
import { MarketHeader } from "../MarketHeader";
import { TradeUrlContent } from "./TradeUrlContent";
import { SteamLinkContent } from "./SteamLinkContent";
import { DepositItemCard } from "./DepositItemCard";
import { DepositHeader } from "./DepositHeader";
import { useInventory } from "./useInventory";

export const DepositContent = () => {
  const [searchText, setSearchText] = useState<string>();
  const [sortIndex, setSortIndex] = useState(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [subType, setSubType] = useState<ItemSubType>();
  const [wear, setWear] = useState<ItemWear>();
  const [provider, setProvider] = useState<MarketProvider>();

  const steamId = useAppSelector((x) => x.user.steamId);
  const tradeUrl = useAppSelector((x) => x.user.meta.steamTradeUrl);

  const { query, items, inventoryId } = useInventory({
    searchText,
    minPrice: Intimal.fromDecimal(priceRange[0]),
    maxPrice: Intimal.fromDecimal(priceRange[1]),
    subType,
    wear,
    provider,
    sortIndex,
  });

  if (!steamId) {
    return <SteamLinkContent />;
  }

  if (!tradeUrl) {
    return <TradeUrlContent />;
  }

  if (query.isPending) {
    return <PageLoading message="Loading Inventory" />;
  }

  if (query.error) {
    return (
      <PageNotice
        image="/graphics/notice-chicken-error"
        title="Error"
        message="Something went wrong, please refetch inventory."
        buttonLabel="Refetch Inventory"
        description={Errors.getMessage(query.error)}
        onButtonClick={() => query.refetch()}
      />
    );
  }

  return (
    <Fragment>
      <DepositHeader items={items} />
      <MarketHeader
        isLoading={query.isLoading}
        searchText={searchText}
        sortIndex={sortIndex}
        priceRange={priceRange}
        subType={subType}
        wear={wear}
        provider={provider}
        setSearchText={setSearchText}
        setSortIndex={setSortIndex}
        setPriceRange={setPriceRange}
        setSubType={setSubType}
        setWear={setWear}
        setProvider={setProvider}
        onRefreshClick={() => query.refetch()}
      />
      <Div
        flow="row-wrap"
        gap={8}
      >
        {items.map((x) => (
          <DepositItemCard
            key={x.assetId}
            item={x}
            onClick={() =>
              Dialogs.open(
                "primary",
                <MarketDepositModal
                  inventoryId={inventoryId}
                  item={x}
                />,
              )
            }
          />
        ))}
      </Div>
    </Fragment>
  );
};
