import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TransactionCategory } from "@core/types/transactions/TransactionCategory";
import { Div } from "@client/comps/div/Div";
import { PageNotice } from "@client/comps/page/PageNotice";
import { Errors } from "@client/services/errors";
import { Users } from "#app/services/users";
import { HistoryTable } from "./HistoryTable";
import { HistoryHeader } from "./HistoryHeader";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { TableFooterPagination } from "#app/comps/pagination/TableFooterPagination";

export const HistoryBody = () => {
  const [category, setCategory] = useState<TransactionCategory | undefined>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { t } = useTranslation(["accounts","validations"]);
  useEffect(() => setPage(1), [category,limit]);

  const query = useQuery({
    queryKey: ["history", category, limit, page],
    queryFn: () => Users.getTransactions({ category, limit, page, game: true }),
    placeholderData: (prev) => prev,
  });

  const small = useIsMobileLayout();
  const transactions = query.data?.transactions || [];
  const total = query.data?.total || 0;

  if (query.error) {
    return (
      <PageNotice
        image="/graphics/notice-chicken-error"
        title="Error"
        message={t("errors.queries.history")}
        buttonLabel={t("history.refetch")}
        description={Errors.getMessage(query.error)}
        onButtonClick={query.refetch}
      />
    );
  }
  return (
    <Div
      fx
      column
      gap={small? 24: 40}
      pt={small ? 24: 0}
    >
      <HistoryHeader
        category={category}
        isLoading={query.isLoading}
        setCategory={setCategory}
        limit={limit}
        setLimit={setLimit}
        onRefreshClick={() => (page === 1 ? query.refetch() : setPage(1))}
      />
      <Div fx column gap={16}>
        <HistoryTable
          transactions={transactions}
          isLoading={query.isLoading}
        />
        <TableFooterPagination
          page={page}
          hasNext={transactions.length !== 0 && transactions.length % limit === 0}
          total={total}
          limit={limit}
          inPage={transactions.length}
          setPage={setPage}
          label={t("account:transactions.transaction",{count: total})}
        />
      </Div>      
    </Div>
  );
};
