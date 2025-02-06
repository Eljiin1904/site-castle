import { useState, Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { Fairness } from "#app/services/fairness";
import { Div } from "@client/comps/div/Div";
import { Button } from "@client/comps/button/Button";
import { Dialogs } from "@client/services/dialogs";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "#app/modals/login/LoginModal";
import { LimboInfoCard } from "./LimboInfoCard";
import { LimboHeader } from "./LimboHeader";
import { LimboFooter } from "./LimboFooter";
import { LimboTable } from "./LimboTable";

export const LimboBody = () => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const authenticated = useAppSelector((x) => x.user.authenticated);

  const query = useQuery({
    enabled: authenticated,
    queryKey: ["limbo-results", limit, page],
    queryFn: () => Fairness.getLimboResults({ limit, page }),
    placeholderData: (prev) => prev,
  });

  const results = query.data?.results || [];

  return (
    <Fragment>
      <LimboInfoCard />
      {authenticated ? (
        <Div
          fx
          column
        >
          <LimboHeader
            isLoading={query.isFetching}
            onRefreshClick={() => (page === 1 ? query.refetch() : setPage(1))}
          />
          <LimboTable
            results={results}
            isLoading={query.isLoading}
          />
          <LimboFooter
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
