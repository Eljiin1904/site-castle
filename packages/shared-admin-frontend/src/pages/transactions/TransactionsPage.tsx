import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { TransactionCategory } from "@core/types/transactions/TransactionCategory";
import { TransactionKind } from "@core/types/transactions/TransactionKind";
import { TransactionStatus } from "@core/types/transactions/TransactionStatus";
import { Div } from "@client/comps/div/Div";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Transactions } from "#app/services/transactions";
import { TransactionTable } from "./TransactionTable";
import { TransactionsHeader } from "./TransactionsHeader";
import { TransactionsFooter } from "./TransactionsFooter";

export const TransactionsPage = () => {
  const limit = 15;
  const [searchText, setSearchText] = useState<string>();
  const [category, setCategory] = useState<TransactionCategory>();
  const [kind, setKind] = useState<TransactionKind>();
  const [status, setStatus] = useState<TransactionStatus>();
  const [minDate, setMinDate] = useState<Date | undefined>(
    subDays(Date.now(), 1),
  );
  const [maxDate, setMaxDate] = useState<Date>();
  const [minValue, setMinValue] = useState<number>();
  const [maxValue, setMaxValue] = useState<number>();
  const [page, setPage] = useState(1);

  useEffect(
    () => setPage(1),
    [searchText, category, kind, status, minDate, maxDate, minValue, maxValue],
  );

  const query = useQuery({
    queryKey: [
      searchText,
      category,
      kind,
      status,
      minDate,
      maxDate,
      minValue,
      maxValue,
      limit,
      page,
    ],
    queryFn: () =>
      Transactions.getTransactions({
        searchText,
        category,
        kind,
        status,
        minDate,
        maxDate,
        minValue,
        maxValue,
        limit,
        page,
      }),
    placeholderData: (prev) => prev,
  });

  const transactions = query.data?.transactions || [];

  return (
    <SitePage
      className="TransactionsPage"
      title="Transactions"
    >
      <TransactionsHeader
        searchText={searchText}
        category={category}
        kind={kind}
        status={status}
        minDate={minDate}
        maxDate={maxDate}
        minValue={minValue}
        maxValue={maxValue}
        isLoading={query.isFetching}
        setSearchText={setSearchText}
        setCategory={setCategory}
        setKind={setKind}
        setStatus={setStatus}
        setMinDate={setMinDate}
        setMaxDate={setMaxDate}
        setMinValue={setMinValue}
        setMaxValue={setMaxValue}
        onRefreshClick={() => (page === 1 ? query.refetch() : setPage(1))}
      />
      <Div
        fx
        column
      >
        <TransactionTable
          transactions={transactions}
          isLoading={query.isLoading}
        />
        <TransactionsFooter
          page={page}
          hasNext={
            transactions.length !== 0 && transactions.length % limit === 0
          }
          setPage={setPage}
        />
      </Div>
    </SitePage>
  );
};
