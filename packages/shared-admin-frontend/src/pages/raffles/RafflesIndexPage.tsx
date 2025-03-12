import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Div } from "@client/comps/div/Div";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Rewards } from "#app/services/rewards";
import { RafflesTable } from "./index/RafflesTable";
import { RafflesHeader } from "./index/RafflesHeader";
import { RafflesFooter } from "./index/RafflesFooter";

export const RafflesIndexPage = () => {
  const limit = 15;
  const [searchText, setSearchText] = useState<string>();
  const [sortIndex, setSortIndex] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [searchText, sortIndex]);

  const query = useQuery({
    queryKey: ["raffles", searchText, sortIndex, limit, page],
    queryFn: () =>
      Rewards.getRaffles({
        searchText,
        sortIndex,
        limit,
        page,
      }),
    placeholderData: (prev) => prev,
  });

  const raffles = query.data?.raffles || [];

  return (
    <SitePage
      className="RafflesIndexPage"
      title="Raffles"
    >
      <RafflesHeader
        searchText={searchText}
        sortIndex={sortIndex}
        isLoading={query.isFetching}
        setSearchText={setSearchText}
        setSortIndex={setSortIndex}
        onRefreshClick={() => (page === 1 ? query.refetch() : setPage(1))}
      />
      <Div
        fx
        column
      >
        <RafflesTable
          raffles={raffles}
          isLoading={query.isLoading}
        />
        <RafflesFooter
          page={page}
          hasNext={raffles.length !== 0 && raffles.length % limit === 0}
          setPage={setPage}
        />
      </Div>
    </SitePage>
  );
};
