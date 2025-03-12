import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Div } from "@client/comps/div/Div";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Affiliates } from "#app/services/affiliates";
import { AffiliateTable } from "./AffiliateTable";
import { AffiliatesHeader } from "./AffiliatesHeader";
import { AffiliatesFooter } from "./AffiliatesFooter";

export const AffiliatesPage = () => {
  const limit = 15;
  const [searchText, setSearchText] = useState<string>();
  const [searchIndex, setSearchIndex] = useState(0);
  const [sortIndex, setSortIndex] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [searchText, searchIndex, sortIndex]);

  const query = useQuery({
    queryKey: ["affiliates", searchText, searchIndex, sortIndex, limit, page],
    queryFn: () =>
      Affiliates.getAffiliates({
        searchText,
        searchIndex,
        sortIndex,
        limit,
        page,
      }),
    placeholderData: (prev) => prev,
  });

  const users = query.data?.users || [];

  return (
    <SitePage
      className="AffiliatePage"
      title="Affiliates"
    >
      <AffiliatesHeader
        searchText={searchText}
        searchIndex={searchIndex}
        sortIndex={sortIndex}
        isLoading={query.isFetching}
        setSearchText={setSearchText}
        setSearchIndex={setSearchIndex}
        setSortIndex={setSortIndex}
        onRefreshClick={() => (page === 1 ? query.refetch() : setPage(1))}
      />
      <Div
        fx
        column
      >
        <AffiliateTable
          users={users}
          isLoading={query.isLoading}
        />
        <AffiliatesFooter
          page={page}
          hasNext={users.length !== 0 && users.length % limit === 0}
          setPage={setPage}
        />
      </Div>
    </SitePage>
  );
};
