import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Button } from "@client/comps/button/Button";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { Cryptos } from "#app/services/cryptos";
import { TransactionsTable } from "./TransactionsTable";

export const TransactionsSection = () => {
  const limit = 15;
  const [page] = useState(1);

  const query = useQuery({
    queryKey: ["crypto-withdraws", limit, page],
    queryFn: () => Cryptos.getWithdraws({ limit, page }),
    placeholderData: (prev) => prev,
  });

  const transactions = query.data?.transactions || [];

  return (
    <Div
      fx
      column
      gap={16}
    >
      <Div
        fx
        align="center"
      >
        <Div grow>
          <Heading>{"Pending Withdraws"}</Heading>
        </Div>
        <Div>
          <Button
            kind="secondary"
            icon={SvgRedo}
            onClick={query.refetch}
          />
        </Div>
      </Div>
      <TransactionsTable
        transactions={transactions}
        isLoading={query.isFetching}
      />
    </Div>
  );
};
