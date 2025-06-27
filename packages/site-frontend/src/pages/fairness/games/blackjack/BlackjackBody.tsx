import { useState, Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { Fairness } from "#app/services/fairness";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { TableFooterPagination } from "#app/comps/pagination/TableFooterPagination";
import { GameHeader } from "../GameHeader";
import { BlackjackFairnessTable } from "./BlackjackFairnessTable";

export const BlackjackBody = () => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const { t } = useTranslation(["fairness"]);
  const query = useQuery({
    enabled: authenticated,
    queryKey: ["blackjack-results", limit, page],
    queryFn: () => Fairness.getBlackjackResults({ limit, page }),
    placeholderData: (prev) => prev,
  });

  const results = query.data?.results || [];

  return (
    <Fragment>
      <GameHeader
        isLoading={query.isFetching}
        onRefreshClick={() => (page === 1 ? query.refetch() : setPage(1))}
      />
    <BlackjackFairnessTable
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
  </Fragment>);
};
