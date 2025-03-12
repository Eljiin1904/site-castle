import { SkinWithdraw } from "@core/types/market/SkinWithdraw";
import { Intimal } from "@core/services/intimal";
import { Dates } from "@core/services/dates";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { Dialogs } from "@client/services/dialogs";
import { SvgAlert } from "@client/svgs/common/SvgAlert";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Users } from "#app/services/users";
import { TransactionModal } from "#app/modals/transaction/TransactionModal";
import { Site } from "#app/services/site";

export const TransactionsTable = ({
  transactions,
  isLoading,
}: {
  transactions: SkinWithdraw[];
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
          heading: "Skin",
          grow: 5,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="gray"
              textOverflow="ellipsis"
              style={{ maxWidth: "400px" }}
            >
              {x.item.marketHashName}
            </Span>
          ),
        },
        {
          heading: "Amount",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => <Tokens value={x.value} />,
        },
        {
          heading: "Amount USD",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              weight="bold"
              color="white"
              family="title"
            >
              {"$"}
              {Intimal.toDecimal(x.value * Site.tokenUsdRate, 2)}
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
