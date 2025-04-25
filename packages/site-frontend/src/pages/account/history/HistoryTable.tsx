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
import { useTranslation } from "@core/services/internationalization/internationalization";

export const HistoryTable = ({
  transactions,
  isLoading,
}: {
  transactions: TransactionDocument[];
  isLoading: boolean;
}) => {
  const mainLayout = useAppSelector((x) => x.style.mainLayout);
  const {t} = useTranslation(["account","fields"]);
  return (
    <Table
      data={transactions}
      loading={isLoading}
      autoScroll={mainLayout === "mobile"}
      emptyMessage={t("history.notFound")}
      hideHeader={mainLayout === "mobile"}
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <TransactionModal transactionId={x._id} />),
      })}
      columns={[
        {
          hidden: mainLayout !== "mobile",
          heading: t("transactions.transaction",{count: 1}),
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Div
              column
              gap={2}
            >
              <Span
                size={12}
                color="light-sand"
              >
                {Transactions.getName(x)}
              </Span>
              <Span
                size={12}
                color="light-sand"
              >
                {Dates.toTimestamp(x.timestamp)}
              </Span>
            </Div>
          ),
        },
        {
          hidden: mainLayout !== "mobile",
          heading: t("history.headers.amount"),
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
                size={12}
                color="light-sand"
              >
                {`(${Intimal.toLocaleString(x.balance + x.amount)})`}
              </Span>
            </Div>
          ),
        },
        {
          hidden: mainLayout === "mobile",
          heading: t("transactions.transaction",{count: 1}),
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span color="light-sand" size={12}>
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
            <Span color="light-sand" size={12}>
             #{x._id}
            </Span>
          ),
        },
        {
          hidden: mainLayout === "mobile",
          heading: t("history.headers.gameId"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span color="light-sand" size={12}>
              {"gameId" in x ? x.gameId : "N/A"}
            </Span>
          ),
        },
        {
          hidden: mainLayout === "mobile" || mainLayout === "tablet",
          heading:  t("history.headers.date"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span color="light-sand" size={12}>
              {Dates.toTimestamp(x.timestamp)}
            </Span>
          ),
        },
        {
          hidden: mainLayout === "mobile" || mainLayout === "tablet",
          heading:  t("history.headers.balanceBefore"),
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => <Tokens fontSize={12} value={x.balance} />,
        },
        {
          hidden: mainLayout === "mobile",
          heading: t("history.headers.amount"),
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Tokens fontSize={12}
              value={x.amount}
              accent={x.amount > 0 ? "positive" : "negative"}
            />
          ),
        },
        {
          hidden: mainLayout === "mobile",
          heading: t("history.headers.balanceAfter"),
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => <Tokens fontSize={12} value={x.balance + x.amount} />,
        },
      ]}
    />
  );
};
