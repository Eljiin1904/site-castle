import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RewardProductKind } from "@core/types/rewards/RewardProductKind";
import { Dialogs } from "@client/services/dialogs";
import { Div } from "@client/comps/div/Div";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Rewards } from "#app/services/rewards";
import { RewardProductEditModal } from "#app/modals/rewards/RewardProductEditModal";
import { RewardProductCreateModal } from "#app/modals/rewards/RewardProductCreateModal";
import { GemStoreHeader } from "./GemStoreHeader";
import { GemStoreFooter } from "./GemStoreFooter";
import { ProductTable } from "./ProductTable";

export const GemStorePage = () => {
  const limit = 15;
  const [searchText, setSearchText] = useState<string>();
  const [kind, setKind] = useState<RewardProductKind>();
  const [sortIndex, setSortIndex] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [searchText, kind, sortIndex]);

  const query = useQuery({
    queryKey: ["products", searchText, kind, sortIndex, page],
    queryFn: () =>
      Rewards.getProducts({ searchText, kind, sortIndex, page, limit }),
    placeholderData: (prev) => prev,
  });

  const products = query.data?.products || [];

  return (
    <SitePage
      className="GemStorePage"
      title="Gem Store"
    >
      <GemStoreHeader
        searchText={searchText}
        kind={kind}
        sortIndex={sortIndex}
        isLoading={query.isFetching}
        setSearchText={setSearchText}
        setKind={setKind}
        setSortIndex={setSortIndex}
        onRefreshClick={() => (page === 1 ? query.refetch() : setPage(1))}
        onCreateClick={() =>
          Dialogs.open(
            "primary",
            <RewardProductCreateModal onSuccess={query.refetch} />,
          )
        }
      />
      <Div
        fx
        column
      >
        <ProductTable
          products={products}
          isLoading={query.isLoading}
          onItemClick={(x) =>
            Dialogs.open(
              "primary",
              <RewardProductEditModal
                product={x}
                onSuccess={query.refetch}
              />,
            )
          }
        />
        <GemStoreFooter
          page={page}
          hasNext={products.length !== 0 && products.length % limit === 0}
          setPage={setPage}
        />
      </Div>
    </SitePage>
  );
};
