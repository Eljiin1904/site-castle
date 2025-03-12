import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Div } from "@client/comps/div/Div";
import { Dialogs } from "@client/services/dialogs";
import { Strings } from "@core/services/strings";
import { Dates } from "@core/services/dates";
import { TransactionModal } from "#app/modals/transaction/TransactionModal";
import { Transactions } from "#app/services/transactions";
import { Users } from "#app/services/users";

export const TransactionTable = ({
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
          grow: 3,
          justify: "flex-start",
          heading: "Transaction",
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
          grow: 3,
          justify: "flex-start",
          heading: "User",
          rowRenderer: (x) => (
            <Div>
              <Span
                weight="medium"
                color="light-blue"
                mr={4}
              >
                {x.user.name}
              </Span>
              <Span weight="medium">{"["}</Span>
              <Span
                weight="medium"
                color="yellow"
              >
                {Users.getLevel(x.user.xp)}
              </Span>
              <Span weight="medium">{"]"}</Span>
            </Div>
          ),
        },
        {
          grow: 2,
          justify: "flex-start",
          heading: "ID",
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
          grow: 2,
          justify: "flex-start",
          heading: "Timestamp",
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
          grow: 2,
          justify: "flex-start",
          heading: "Amount",
          rowRenderer: (x) => (
            <Tokens
              value={x.amount}
              accent={x.amount > 0 ? "positive" : "negative"}
            />
          ),
        },
        {
          grow: 1,
          justify: "flex-end",
          heading: "Status",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              color={Transactions.getStatusColor(x.status)}
            >
              {Strings.kebabToTitle(x.status)}
            </Span>
          ),
        },
      ]}
    />
  );
};
