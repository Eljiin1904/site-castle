import { useState, Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { Fairness } from "#app/services/fairness";
import { Div } from "@client/comps/div/Div";
import { Button } from "@client/comps/button/Button";
import { Dialogs } from "@client/services/dialogs";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "#app/modals/login/LoginModal";
import { DiceInfoCard } from "./DiceInfoCard";
import { DiceHeader } from "./DiceHeader";
import { DiceFooter } from "./DiceFooter";
import { DiceTable } from "./DiceTable";

export const DiceBody = () => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const authenticated = useAppSelector((x) => x.user.authenticated);

  const query = useQuery({
    enabled: authenticated,
    queryKey: ["dice-results", limit, page],
    queryFn: () => Fairness.getDiceResults({ limit, page }),
    placeholderData: (prev) => prev,
  });

  const results = query.data?.results || [];

  return (
    <Fragment>
      <DiceInfoCard />
      {authenticated ? (
        <Div
          fx
          column
        >
          <DiceHeader
            isLoading={query.isFetching}
            onRefreshClick={() => (page === 1 ? query.refetch() : setPage(1))}
          />
          <DiceTable
            results={results}
            isLoading={query.isLoading}
          />
          <DiceFooter
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
