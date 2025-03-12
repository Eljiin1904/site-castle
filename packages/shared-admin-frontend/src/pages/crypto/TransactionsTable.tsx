import { CryptoWithdraw } from "@core/types/cryptos/CryptoWithdraw";
import { Dates } from "@core/services/dates";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { Dialogs } from "@client/services/dialogs";
import { SvgAlert } from "@client/svgs/common/SvgAlert";
import { Cryptos } from "#app/services/cryptos";
import { Users } from "#app/services/users";
import { TransactionModal } from "#app/modals/transaction/TransactionModal";

export const TransactionsTable = ({
  transactions,
  isLoading,
}: {
  transactions: CryptoWithdraw[];
  isLoading: boolean;
}) => {
  return (
    <Table
      data={transactions}
      loading={isLoading}
      emptyMessage="No withdraws are pending approval."
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <TransactionModal transactionId={x._id} />),
      })}
      columns={[
        {
          heading: "Crypto",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => {
            const crypto = Cryptos.getInfo(x.cryptoKind);
            return (
              <Div
                center
                gap={8}
              >
                <Vector
                  as={Cryptos.getIcon(crypto.symbol)}
                  size={18}
                />
                <Span
                  weight="medium"
                  color="white"
                >
                  {x.cryptoKind.replace("_", " ")}
                </Span>
              </Div>
            );
          },
        },
        {
          heading: "Amount",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => {
            const crypto = Cryptos.getInfo(x.cryptoKind);
            return (
              <Span
                weight="medium"
                color="white"
              >
                {x.cryptoAmount.toLocaleString(undefined, {
                  minimumFractionDigits: crypto.decimals,
                  maximumFractionDigits: crypto.decimals,
                })}
              </Span>
            );
          },
        },
        {
          heading: "Amount USD",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              color="white"
            >
              {"$"}
              {x.usdAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </Span>
          ),
        },
        {
          heading: "User",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Div>
              {x.user.tags.includes("cheeky") && (
                <Vector
                  as={SvgAlert}
                  size={16}
                  color="light-orange"
                  mr={6}
                  data-tooltip-id="app-tooltip"
                  data-tooltip-content="Cheeky"
                />
              )}
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
          justify: "flex-end",
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
      ]}
    />
  );
};
