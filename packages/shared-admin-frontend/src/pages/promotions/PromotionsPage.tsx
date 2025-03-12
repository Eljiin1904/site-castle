import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialogs } from "@client/services/dialogs";
import { Div } from "@client/comps/div/Div";
import { PromotionCreateModal } from "#app/modals/promotion-create/PromotionCreateModal";
import { PromotionModal } from "#app/modals/promotion/PromotionModal";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Economy } from "#app/services/economy";
import { PromotionsHeader } from "./PromotionsHeader";
import { PromotionTable } from "./PromotionTable";
import { PromotionsFooter } from "./PromotionsFooter";

export const PromotionsPage = () => {
  const limit = 15;
  const [searchText, setSearchText] = useState<string>();
  const [sortIndex, setSortIndex] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [searchText, sortIndex]);

  const query = useQuery({
    queryKey: ["promotions", searchText, sortIndex, limit, page],
    queryFn: () =>
      Economy.getPromotions({ searchText, sortIndex, limit, page }),
    placeholderData: (prev) => prev,
  });

  const promotions = query.data?.promotions || [];

  return (
    <SitePage
      className="PromotionPage"
      title="Promotions"
    >
      <PromotionsHeader
        searchText={searchText}
        sortIndex={sortIndex}
        isLoading={query.isFetching}
        setSearchText={setSearchText}
        setSortIndex={setSortIndex}
        onRefreshClick={() => (page === 1 ? query.refetch() : setPage(1))}
        onCreateClick={() =>
          Dialogs.open(
            "primary",
            <PromotionCreateModal onSuccess={query.refetch} />,
          )
        }
      />
      <Div
        fx
        column
      >
        <PromotionTable
          promotions={promotions}
          isLoading={query.isLoading}
          onItemClick={(x) =>
            Dialogs.open(
              "primary",
              <PromotionModal
                promotion={x}
                onCancel={query.refetch}
              />,
            )
          }
        />
        <PromotionsFooter
          page={page}
          hasNext={promotions.length !== 0 && promotions.length % limit === 0}
          setPage={setPage}
        />
      </Div>
    </SitePage>
  );
};
