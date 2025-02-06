import { Fragment, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Chests } from "@core/services/chests";
import { ChestKind } from "@core/types/chests/ChestKind";
import { Div } from "@client/comps/div/Div";
import { Button } from "@client/comps/button/Button";
import { Dialogs } from "@client/services/dialogs";
import { Fairness } from "#app/services/fairness";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "#app/modals/login/LoginModal";
import { CaseGameInfoCard } from "./CaseGameInfoCard";
import { CaseGameTable } from "./CaseGameTable";
import { CaseGameFooter } from "./CaseGameFooter";
import { CaseGameHeader } from "./CaseGameHeader";

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
      <CaseGameInfoCard />
      {authenticated ? (
        <Div
          fx
          column
        >
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
          <CaseGameFooter
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
