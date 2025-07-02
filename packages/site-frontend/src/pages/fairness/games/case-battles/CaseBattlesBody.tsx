import { Fragment, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Div } from "@client/comps/div/Div";
import { Button } from "@client/comps/button/Button";
import { Dialogs } from "@client/services/dialogs";
import { Fairness } from "#app/services/fairness";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "#app/modals/login/LoginModal";
import { CaseBattlesInfoCard } from "./CaseBattlesInfoCard";
import { CaseBattlesTable } from "./CaseBattleTable";
import { GameHeader } from "../GameHeader";
import { TableFooterPagination } from "#app/comps/pagination/TableFooterPagination";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const CaseBattlesBody = () => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const {t} = useTranslation();
  const query = useQuery({
    enabled: authenticated,
    queryKey: ["case-battle-results", limit, page],
    queryFn: () => Fairness.getCaseBattleResults({ limit, page }),
    placeholderData: (prev) => prev,
  });

  const results = query.data?.results || [];

  return (
      <Fragment>
        <GameHeader
          isLoading={query.isFetching}
          onRefreshClick={() => (page === 1 ? query.refetch() : setPage(1))}
        />
        <CaseBattlesTable
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
          label={t("account:transactions.transaction",{count: query.data?.total || 0})}
        />
      </Fragment>
    );
};
