import { RewardProductDocument } from "@core/types/rewards/RewardProductDocument";
import { Intimal } from "@core/services/intimal";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { SvgSiteGem } from "@client/svgs/site/SvgSiteGem";
import { Tokens } from "@client/comps/tokens/Tokens";
import { SvgChest } from "@client/svgs/common/SvgChest";
import { SvgCoin } from "@client/svgs/common/SvgCoin";

export const ProductTable = ({
  products,
  isLoading,
  onItemClick,
}: {
  products: RewardProductDocument[];
  isLoading: boolean;
  onItemClick: (x: RewardProductDocument) => void;
}) => {
  return (
    <Table
      data={products}
      loading={isLoading}
      emptyMessage="No products found."
      onRowProps={(x) => ({
        type: "action",
        onClick: () => onItemClick(x),
      })}
      columns={[
        {
          heading: "Product",
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Div>
              <Vector
                as={
                  {
                    case: SvgChest,
                    tokens: SvgCoin,
                  }[x.kind]
                }
                color={
                  {
                    case: "light-blue",
                    tokens: "gold",
                  }[x.kind] as Color
                }
                mr={8}
              />
              <Span
                weight="medium"
                color={x.disabled ? "light-red" : "light-gray"}
                mr={4}
              >
                {x.displayName}
              </Span>
            </Div>
          ),
        },
        {
          heading: "ID",
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => <Span>{x._id}</Span>,
        },
        {
          heading: "Description",
          grow: 4,
          justify: "flex-start",
          rowRenderer: (x) => {
            switch (x.kind) {
              case "case":
                return (
                  <Div>
                    <Span
                      weight="medium"
                      color="white"
                      mr={4}
                    >
                      {x.chest.displayName}
                    </Span>
                    <Span>{"("}</Span>
                    <Span
                      weight="medium"
                      color="light-blue"
                    >
                      {`#${x.chest.id}`}
                    </Span>
                    <Span>{")"}</Span>
                  </Div>
                );
              case "tokens":
                return <Tokens value={x.tokenAmount} />;
              default:
                return null;
            }
          },
        },
        {
          heading: "Cost",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Div gap={6}>
              <Vector
                as={SvgSiteGem}
                size={14}
              />
              <Span
                family="title"
                weight="bold"
                color="white"
              >
                {Intimal.toLocaleString(x.gemCost, 0)}
              </Span>
            </Div>
          ),
        },
        {
          heading: "Status",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              color={x.disabled ? "light-red" : "light-green"}
            >
              {x.disabled ? "Disabled" : "Enabled"}
            </Span>
          ),
        },
      ]}
    />
  );
};
