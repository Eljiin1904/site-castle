import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialogs } from "@client/services/dialogs";
import { Div } from "@client/comps/div/Div";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Economy } from "#app/services/economy";
import { GiftBatchCreateModal } from "#app/modals/gift-batch-create/GiftBatchCreateModal";
import { GiftBatchTable } from "./GiftBatchTable";
import { GiftCardsHeader } from "./GiftCardsHeader";
import { GiftCardsFooter } from "./GiftCardsFooter";

export const GiftCardsPage = () => {
  const limit = 15;
  const [searchText, setSearchText] = useState<string>();
  const [sortIndex, setSortIndex] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [searchText, sortIndex]);

  const query = useQuery({
    queryKey: ["gift-batches", searchText, sortIndex, limit, page],
    queryFn: () =>
      Economy.getGiftBatches({ searchText, sortIndex, limit, page }),
    placeholderData: (prev) => prev,
  });

  const batches = query.data?.batches || [];

  return (
    <SitePage
      className="GiftCardsPage"
      title="Gift Cards"
    >
      <GiftCardsHeader
        searchText={searchText}
        sortIndex={sortIndex}
        isLoading={query.isFetching}
        setSearchText={setSearchText}
        setSortIndex={setSortIndex}
        onRefreshClick={() => (page === 1 ? query.refetch() : setPage(1))}
        onCreateClick={() =>
          Dialogs.open(
            "primary",
            <GiftBatchCreateModal onSuccess={query.refetch} />,
          )
        }
      />
      <Div
        fx
        column
      >
        <GiftBatchTable
          batches={batches}
          isLoading={query.isLoading}
        />
        <GiftCardsFooter
          page={page}
          hasNext={batches.length !== 0 && batches.length % limit === 0}
          setPage={setPage}
        />
      </Div>
    </SitePage>
  );
};
