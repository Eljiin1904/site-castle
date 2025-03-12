import { Intimal } from "@core/services/intimal";
import { ChestWithReport } from "@core/types/chests/ChestDocument";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { SvgChest } from "@client/svgs/common/SvgChest";

export const ChestTable = ({
  chests,
  isLoading,
}: {
  chests: ChestWithReport[];
  isLoading: boolean;
}) => {
  return (
    <Table
      data={chests}
      loading={isLoading}
      emptyMessage="No chests found."
      onRowProps={(x) => ({
        type: "router",
        to: `/chests/edit/${x._id}`,
      })}
      columns={[
        {
          heading: "Chest",
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Div>
              <Vector
                as={SvgChest}
                color={
                  {
                    case: "gold",
                    "gem-case": "light-blue",
                    "holiday-case": "light-green",
                    "level-case": "light-purple",
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
          heading: "Cost",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Tokens value={x.openCost} />,
        },
        {
          heading: "Opens",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              family="title"
              weight="bold"
              color="white"
            >
              {x.openCount}
            </Span>
          ),
        },
        {
          heading: "Players",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              family="title"
              weight="bold"
              color="light-blue"
            >
              {x.playerCount}
            </Span>
          ),
        },
        {
          heading: "EV",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              family="title"
              weight="bold"
              color="light-green"
            >
              {Intimal.toLocaleString(x.ev)}
            </Span>
          ),
        },
        {
          heading: "EVPP",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              family="title"
              weight="bold"
              color="yellow"
            >
              {Intimal.toLocaleString(x.evpp)}
            </Span>
          ),
        },
      ]}
    />
  );
};
