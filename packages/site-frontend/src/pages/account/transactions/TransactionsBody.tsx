import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TransactionCategory } from "@core/types/transactions/TransactionCategory";
import { Div } from "@client/comps/div/Div";
import { PageNotice } from "@client/comps/page/PageNotice";
import { Errors } from "@client/services/errors";
import { Users } from "#app/services/users";
import { TransactionsHeader } from "./TransactionsHeader";
import { TransactionsTable } from "./TransactionsTable";
import { TransactionsFooter } from "./TransactionsFooter";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const TransactionsBody = () => {

  const [category, setCategory] = useState<TransactionCategory | undefined>();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { t } = useTranslation(["accounts","validations"]);

  useEffect(() => setPage(1), [category,limit]);

  const query = useQuery({
    queryKey: ["transactions", category, limit, page],
    queryFn: () =>
      Users.getTransactions({ category, limit, page, game: false }),
    placeholderData: (prev) => prev,
  });

  const transactions = query.data?.transactions || [];

  if (query.error) {
    return (
      <PageNotice
        image="/graphics/notice-chicken-error"
        title="Error"
        message={t("errors.queries.transactions")}
        buttonLabel={t("transactions.refetch")}
        description={Errors.getMessage(query.error)}
        onButtonClick={query.refetch}
      />
    );
  }
  return (
    <Div
      fx
      column
      gap={40}
    >
      <TransactionsHeader
        category={category}
        isLoading={query.isLoading}
        setCategory={setCategory}
        limit={limit}
        setLimit={setLimit}
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
