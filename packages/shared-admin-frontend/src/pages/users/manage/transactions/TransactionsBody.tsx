import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserDocument } from "@core/types/users/UserDocument";
import { TransactionKind } from "@core/types/transactions/TransactionKind";
import { Div } from "@client/comps/div/Div";
import { Users } from "#app/services/users";
import { TransactionsHeader } from "./TransactionsHeader";
import { TransactionsTable } from "./TransactionsTable";
import { TransactionsFooter } from "./TransactionsFooter";

export const TransactionsBody = ({ user }: { user: UserDocument }) => {
  const userId = user._id;
  const limit = 12;
  const [kind, setKind] = useState<TransactionKind>();
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [kind]);

  const query = useQuery({
    queryKey: ["user-txs", userId, kind, limit, page],
    queryFn: () => Users.getTransactions({ userId, kind, limit, page }),
    placeholderData: (prev) => prev,
  });

  const transactions = query.data?.transactions || [];

  return (
    <Div
      fx
      column
    >
      <TransactionsHeader
        kind={kind}
        isLoading={query.isLoading}
        setKind={setKind}
        onRefreshClick={() => (page === 1 ? query.refetch() : setPage(1))}
      />
      <TransactionsTable
        transactions={transactions}
        isLoading={query.isLoading}
      />
      <TransactionsFooter
        page={page}
        hasNext={transactions.length !== 0 && transactions.length % limit === 0}
        setPage={setPage}
      />
    </Div>
  );
};
