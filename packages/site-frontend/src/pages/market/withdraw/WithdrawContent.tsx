import { Fragment, useState } from "react";
import { ItemSubType } from "@core/types/items/ItemSubType";
import { MarketProvider } from "@core/types/market/MarketProvider";
import { ItemWear } from "@core/types/items/ItemWear";
import { Intimal } from "@core/services/intimal";
import { PageNotice } from "@client/comps/page/PageNotice";
import { Errors } from "@client/services/errors";
import { PageLoading } from "@client/comps/page/PageLoading";
import { Dialogs } from "@client/services/dialogs";
import { Catalog } from "@client/comps/catalog/Catalog";
import { MarketWithdrawModal } from "#app/modals/market/MarketWithdrawModal";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { MarketHeader } from "../MarketHeader";
import { WithdrawItemCard, WithdrawItemPlaceholder } from "./WithdrawItemCard";
import { WithdrawHeader } from "./WithdrawHeader";
import { useMarket } from "./useMarket";

export const WithdrawContent = () => {
  const [searchText, setSearchText] = useState<string>();
  const [sortIndex, setSortIndex] = useState(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [subType, setSubType] = useState<ItemSubType>();
  const [wear, setWear] = useState<ItemWear>();
  const [provider, setProvider] = useState<MarketProvider>();

  const layout = useAppSelector((x) => x.style.mainLayout);
  const limit = layout === "desktop" ? 64 : 40;

  const { query, pages } = useMarket({
    searchText,
    minPrice: Intimal.fromDecimal(priceRange[0]),
    maxPrice: Intimal.fromDecimal(priceRange[1]),
    subType,
    wear,
    provider,
    sortIndex,
    limit,
  });

  if (query.isPending) {
    return <PageLoading message="Loading Market" />;
  }

  if (query.error) {
    return (
      <PageNotice
        image="/graphics/notice-chicken-error"
        title="Error"
        message="Something went wrong, please refetch market."
        buttonLabel="Refetch Market"
        description={Errors.getMessage(query.error)}
        onButtonClick={() => query.refetch()}
      />
    );
  }

  return (
    <Fragment>
      <WithdrawHeader />
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
      <Catalog
        gap={8}
        pages={pages}
        pageSize={limit}
        isFetching={query.isFetching}
        emptyMessage="No items found."
        hasNextPage={query.hasNextPage}
        fetchNextPage={query.fetchNextPage}
        placeholderRenderer={(key) => <WithdrawItemPlaceholder key={key} />}
        itemRenderer={(x) => (
          <WithdrawItemCard
            key={x._id}
            item={x}
            onClick={() => Dialogs.open("primary", <MarketWithdrawModal item={x} />)}
          />
        )}
      />
    </Fragment>
  );
};
