import { Fragment, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Chests } from "@core/services/chests";
import { ChestKind } from "@core/types/chests/ChestKind";
import { Fairness } from "#app/services/fairness";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { CaseGameTable } from "./CaseGameTable";
import { CaseGameHeader } from "./CaseGameHeader";
import { TableFooterPagination } from "#app/comps/pagination/TableFooterPagination";

export const CasesBody = ({ kind }: { kind: ChestKind }) => {
  const limit = 10;
  const [kindIndex, setKindIndex] = useState(Chests.kinds.indexOf(kind));
  const [page, setPage] = useState(1);
  const authenticated = useAppSelector((x) => x.user.authenticated);

  useEffect(() => {
    setKindIndex(Chests.kinds.indexOf(kind));
  }, [kind]);

  useEffect(() => setPage(1), [kindIndex]);

  const query = useQuery({
    enabled: authenticated,
    queryKey: ["case-results", kindIndex, limit, page],
    queryFn: () =>
      Fairness.getCaseGameResults({
        kind: Chests.kinds[kindIndex],
        limit,
        page,
      }),
    placeholderData: (prev) => prev,
  });

  const results = query.data?.results || [];

  return (
    <Fragment>
      <CaseGameHeader
        kindIndex={kindIndex}
        isLoading={query.isFetching}
        setKindIndex={setKindIndex}
        onRefreshClick={() => (page === 1 ? query.refetch() : setPage(1))}
      />
      <CaseGameTable
        results={results}
        isLoading={query.isLoading}
      />
      <TableFooterPagination
        page={page}
        hasNext={results.length !== 0 && results.length % limit === 0}
        total={query.data?.total || 0}
        limit={limit}
        inPage={results.length}
        setPage={setPage}
      />
    </Fragment>
  );
};


