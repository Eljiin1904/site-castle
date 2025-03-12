import { Strings } from "@core/services/strings";
import { Dates } from "@core/services/dates";
import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Dialogs } from "@client/services/dialogs";
import { TransactionModal } from "#app/modals/transaction/TransactionModal";
import { Transactions } from "#app/services/transactions";

export const TransactionsTable = ({
  transactions,
  isLoading,
}: {
  transactions: TransactionDocument[];
  isLoading: boolean;
}) => {
  return (
    <Table
      data={transactions}
      loading={isLoading}
      emptyMessage="No transactions found."
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <TransactionModal transactionId={x._id} />),
      })}
      columns={[
        {
          heading: "Type",
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
          heading: "Timestamp",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              color="white"
            >
              {Dates.toTimestamp(x.timestamp, { second: "numeric" })}
            </Span>
          ),
        },
        {
          heading: "Status",
          grow: 1,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              color={Transactions.getStatusColor(x.status)}
            >
              {Strings.kebabToTitle(x.status)}
            </Span>
          ),
        },
        {
          heading: "Balance Before",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => <Tokens value={x.balance} />,
        },
        {
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
          heading: "Balance After",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => <Tokens value={x.balance + x.amount} />,
        },
      ]}
    />
  );
};
