import { Fragment, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CaseBattlesHeader } from "./CaseBattlesHeader";
import { Div } from "@client/comps/div/Div";
import { Button } from "@client/comps/button/Button";
import { Dialogs } from "@client/services/dialogs";
import { Fairness } from "#app/services/fairness";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "#app/modals/login/LoginModal";
import { CaseBattlesInfoCard } from "./CaseBattlesInfoCard";
import { CaseBattlesFooter } from "./CaseBattlesFooter";
import { CaseBattlesTable } from "./CaseBattleTable";

export const CaseBattlesBody = () => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const authenticated = useAppSelector((x) => x.user.authenticated);

  const query = useQuery({
    enabled: authenticated,
    queryKey: ["case-battle-results", limit, page],
    queryFn: () => Fairness.getCaseBattleResults({ limit, page }),
    placeholderData: (prev) => prev,
  });

  const results = query.data?.results || [];

  return (
    <Fragment>
      <CaseBattlesInfoCard />
      {authenticated ? (
        <Div
          fx
          column
        >
          <CaseBattlesHeader
            isLoading={query.isFetching}
            onRefreshClick={() => (page === 1 ? query.refetch() : setPage(1))}
          />
          <CaseBattlesTable
            results={results}
            isLoading={query.isLoading}
          />
          <CaseBattlesFooter
            page={page}
            hasNext={results.length !== 0 && results.length % limit === 0}
            setPage={setPage}
          />
        </Div>
      ) : (
        <Div>
          <Button
            kind="primary"
            label="Login to View Results"
            onClick={() =>
              Dialogs.open("primary", <LoginModal initialAction="login" />)
            }
          />
        </Div>
      )}
    </Fragment>
  );
};
