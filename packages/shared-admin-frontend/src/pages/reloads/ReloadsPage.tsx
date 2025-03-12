import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Div } from "@client/comps/div/Div";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Affiliates } from "#app/services/affiliates";
import { ReloadsTable } from "./ReloadsTable";
import { ReloadsHeader } from "./ReloadsHeader";
import { ReloadsFooter } from "./ReloadsFooter";

export const ReloadsPage = () => {
  const limit = 15;
  const [searchText, setSearchText] = useState<string>();
  const [searchIndex, setSearchIndex] = useState(0);
  const [sortIndex, setSortIndex] = useState(2);
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [searchText, searchIndex, sortIndex]);

  const query = useQuery({
    queryKey: ["reloads", searchText, searchIndex, sortIndex, limit, page],
    queryFn: () =>
      Affiliates.getReloads({
        searchText,
        searchIndex,
        sortIndex,
        limit,
        page,
      }),
    placeholderData: (prev) => prev,
  });

  const reloads = query.data?.reloads || [];

  return (
    <SitePage
      className="ReloadsPage"
      title="Reloads"
    >
      <ReloadsHeader
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
        <ReloadsTable
          reloads={reloads}
          isLoading={query.isLoading}
          refetch={query.refetch}
        />
        <ReloadsFooter
          page={page}
          hasNext={reloads.length !== 0 && reloads.length % limit === 0}
          setPage={setPage}
        />
      </Div>
    </SitePage>
  );
};
