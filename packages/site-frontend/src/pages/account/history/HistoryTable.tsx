import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { Intimal } from "@core/services/intimal";
import { Transactions } from "@core/services/transactions";
import { Dates } from "@core/services/dates";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Dialogs } from "@client/services/dialogs";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { TransactionModal } from "#app/modals/transaction/TransactionModal";

export const HistoryTable = ({
  transactions,
  isLoading,
}: {
  transactions: TransactionDocument[];
  isLoading: boolean;
}) => {
  const mainLayout = useAppSelector((x) => x.style.mainLayout);

  return (
    <Table
      data={transactions}
      loading={isLoading}
      autoScroll={mainLayout === "mobile"}
      emptyMessage="No game history found."
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <TransactionModal transactionId={x._id} />),
      })}
      columns={[
        {
          hidden: mainLayout !== "mobile",
          heading: "Transaction",
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Div
              column
              gap={2}
            >
              <Span
                weight="medium"
                size={12}
                color="white"
              >
                {Transactions.getName(x)}
              </Span>
              <Span
                weight="medium"
                size={12}
              >
                {"#"}
                {"gameId" in x ? x.gameId : x._id}
              </Span>
            </Div>
          ),
        },
        {
          hidden: mainLayout !== "mobile",
          heading: "Amount",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Div
              column
              align="flex-end"
            >
              <Tokens
                value={x.amount}
                accent={x.amount > 0 ? "positive" : "negative"}
                hideIcon
                fontSize={12}
              />
              <Span
                weight="medium"
                family="title"
                size={12}
              >
                {`(${Intimal.toLocaleString(x.balance + x.amount)})`}
              </Span>
            </Div>
          ),
        },
        {
          hidden: mainLayout === "mobile",
          heading: "Transaction",
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              color="white"
            >
              {Transactions.getName(x)}
            </Span>
          ),
        },
        {
          hidden: mainLayout === "mobile",
          heading: "ID",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              color="white"
            >
              {x._id}
            </Span>
          ),
        },
        {
          hidden: mainLayout === "mobile",
          heading: "Game ID",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              color="white"
            >
              {"gameId" in x ? x.gameId : "N/A"}
            </Span>
          ),
        },
        {
          hidden: mainLayout === "mobile" || mainLayout === "tablet",
          heading: "Timestamp",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              color="white"
            >
              {Dates.toTimestamp(x.timestamp)}
            </Span>
          ),
        },
        {
          hidden: mainLayout === "mobile" || mainLayout === "tablet",
          heading: "Balance Before",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => <Tokens value={x.balance} />,
        },
        {
          hidden: mainLayout === "mobile",
          heading: "Amount",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Tokens
              value={x.amount}
              accent={x.amount > 0 ? "positive" : "negative"}
            />
          ),
        },
        {
          hidden: mainLayout === "mobile",
          heading: "Balance After",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => <Tokens value={x.balance + x.amount} />,
        },
      ]}
    />
  );
};
