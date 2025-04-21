import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { Intimal } from "@core/services/intimal";
import { Strings } from "@core/services/strings";
import { Transactions } from "@client/services/transactions";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Dialogs } from "@client/services/dialogs";
import { Dates } from "@core/services/dates";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { TransactionModal } from "#app/modals/transaction/TransactionModal";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const TransactionsTable = ({
  transactions,
  isLoading,
}: {
  transactions: TransactionDocument[];
  isLoading: boolean;
}) => {
  const mainLayout = useAppSelector((x) => x.style.mainLayout);
  // const small = mainLayout === "mobile" || mainLayout === "tablet";
  const {t} = useTranslation(["account","fields"]);
  return (
    <Table
      data={transactions}
      loading={isLoading}
      autoScroll={mainLayout === "mobile"}
      emptyMessage={t("transactions.notFound")}
      hideHeader={mainLayout === "mobile"}
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <TransactionModal transactionId={x._id} />),
      })}
      columns={[
        {
          hidden: mainLayout !== "mobile",
          heading:t("transactions.transaction",{count: 1}),
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
              <Div gap={3}>                
                <Span
                  size={12}
                  color="light-sand"
                >
                  {Dates.toTimestamp(x.timestamp)}
                </Span>                
              </Div>
            </Div>
          ),
        },
        {
          hidden: mainLayout !== "mobile",
          heading: t("transactions.headers.amount"),
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Div
              column
              align="flex-end"
            >
              <Span
                size={12}
                color={Transactions.getStatusColor(x.status)}
              >
                {Strings.kebabToTitle(t(`transactions.status.${x.status}`))}
              </Span>
              <Tokens
                value={x.amount}               
                hideIcon
                fontSize={12}
              />
            </Div>
          ),
        },
        {
          hidden: mainLayout === "mobile",
          heading: t("transactions.headers.type"),
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              size={12}
            >
              {Transactions.getName(x)}
            </Span>
          ),
        },
        {
          hidden: mainLayout === "mobile",
          heading: t("transactions.headers.id"),
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              size={12}
            >
              #{x._id}
            </Span>
          ),
        },
        {
          hidden: mainLayout === "mobile" || mainLayout === "tablet",
          heading: t("transactions.headers.date"),
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              size={12}
            >
              {Dates.toTimestamp(x.timestamp)}
            </Span>
          ),
        },
        {
          hidden: mainLayout === "mobile",
          heading: t("transactions.headers.status"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              size={12}
              color={Transactions.getStatusColor(x.status)}
            >
             {Strings.kebabToTitle(t(`transactions.status.${x.status}`))}
            </Span>
          ),
        },
        {
          hidden: mainLayout === "mobile" || mainLayout === "tablet",
          heading: t("transactions.headers.balanceBefore"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Tokens fontSize={12} value={x.balance} />,
        },
        {
          hidden: mainLayout === "mobile",
          heading: t("transactions.headers.amount"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Tokens
              value={x.amount}
              fontSize={12}
            />
          ),
        },
        {
          hidden: mainLayout === "mobile",
          heading:t("transactions.headers.balanceAfter"),
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Tokens
              fontSize={12}
              value={
                x.status === "cancelled" ? x.balance : x.balance + x.amount
              }
            />
          ),
        },
      ]}
    />
  );
};