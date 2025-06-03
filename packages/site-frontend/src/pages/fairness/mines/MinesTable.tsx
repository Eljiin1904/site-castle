import { Dates } from "@core/services/dates";
import { MinesResult } from "@core/types/mines/MinesResult";
import { Numbers } from "@core/services/numbers";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Div } from "@client/comps/div/Div";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Dialogs } from "@client/services/dialogs";
import { SvgExternal } from "@client/svgs/common/SvgExternal";
import { Button } from "@client/comps/button/Button";
import { Tokens } from "@client/comps/tokens/Tokens";
// import { FairnessMinesModal } from "#app/modals/fairness/FairnessMinesModal";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { FairnessMinesModal } from "#app/modals/fairness/FairnessMinesModal";

type MinesTableProps = {
  results: MinesResult[];
  isLoading: boolean;
};

export const MinesTable = (props: MinesTableProps) => {
  const layout = useAppSelector((x) => x.style.mainLayout);

  return (
    <Conditional
      value={layout}
      mobile={<MobileTable {...props} />}
      tablet={<TabletTable {...props} />}
      laptop={<LaptopDesktopTable {...props} />}
      desktop={<LaptopDesktopTable {...props} />}
    />
  );
};

const MobileTable = ({ results, isLoading }: MinesTableProps) => {
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage="No results found."
      onRowProps={(x) => ({
        type: "action",
        onClick: () => Dialogs.open("primary", <FairnessMinesModal result={x} />),
      })}
      columns={[
        {
          heading: "Game",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Div
              column
              gap={2}
            >
              <Span
                size={12}
                color="white"
                textOverflow="ellipsis"
                style={{ maxWidth: "100px" }}
              >
                {x.gridSize}
                {"x"}
                {x.gridSize}
                {" - "}
                {x.mineCount}
                {" mines"}
              </Span>
              <Span
                color="gray"
                size={12}
                textOverflow="ellipsis"
              >
                {"#"}
                {x.gameId}
              </Span>
            </Div>
          ),
        },
        {
          heading: "Result",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Div
              column
              align="flex-end"
              gap={2}
            >
              <Div gap={8}>
                <Span
                  color="light-gray"
                  size={12}
                >
                  {Numbers.toLocaleString(x.multiplier, 2)}
                  {"x"}
                </Span>
                <Tokens
                  fontSize={12}
                  value={x.wonAmount}
                />
              </Div>
              <Span
                color="light-yellow"
                size={12}
              >
                {"Click to view inputs"}
              </Span>
            </Div>
          ),
        },
      ]}
    />
  );
};

const TabletTable = ({ results, isLoading }: MinesTableProps) => {
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage="No results found."
      onRowProps={(x) => ({
        type: "action",
        onClick: () => Dialogs.open("primary", <FairnessMinesModal result={x} />),
      })}
      columns={[
        {
          heading: "Game ID",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="white">{x.gameId}</Span>,
        },
        {
          heading: "Date",
          grow: 4,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="white">{Dates.toTimestamp(x.timestamp)}</Span>,
        },
        {
          heading: "Grid Size",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="white"
              textOverflow="ellipsis"
            >
              {x.gridSize}
            </Span>
          ),
        },
        {
          heading: "Mine Count",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="white"
              textOverflow="ellipsis"
            >
              {x.mineCount}
            </Span>
          ),
        },
        {
          heading: "Multiplier",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="white"
              textOverflow="ellipsis"
            >
              {Numbers.toLocaleString(x.multiplier, 2)}
              {"x"}
            </Span>
          ),
        },
        {
          heading: "Input",
          grow: 1,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Button
              kind="secondary"
              size="xs"
              icon={SvgExternal}
            />
          ),
        },
      ]}
    />
  );
};

const LaptopDesktopTable = ({ results, isLoading }: MinesTableProps) => {
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage="No results found."
      onRowProps={(x) => ({
        type: "action",
        onClick: () => Dialogs.open("primary", <FairnessMinesModal result={x} />),
      })}
      columns={[
        {
          heading: "Game ID",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="white">{x.gameId}</Span>,
        },
        {
          heading: "Date",
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="white">{Dates.toTimestamp(x.timestamp)}</Span>,
        },
        {
          heading: "Grid Size",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="white"
              textOverflow="ellipsis"
            >
              {x.gridSize}
            </Span>
          ),
        },
        {
          heading: "Mine Count",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="white"
              textOverflow="ellipsis"
            >
              {x.mineCount}
            </Span>
          ),
        },
        {
          heading: "Multiplier",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="white"
              textOverflow="ellipsis"
            >
              {Numbers.toLocaleString(x.multiplier, 2)}
              {"x"}
            </Span>
          ),
        },
        {
          heading: "Client Seed",
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="white"
              textOverflow="ellipsis"
              style={{ maxWidth: "120px" }}
            >
              {x.clientSeed}
            </Span>
          ),
        },
        {
          heading: "Server Seed",
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color={x.serverSeed ? "white" : "orange"}
              textOverflow="ellipsis"
              style={{ maxWidth: "150px" }}
            >
              {x.serverSeed ? x.serverSeed : x.serverSeedHashed}
            </Span>
          ),
        },
        {
          heading: "Nonce",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              color="white"
            >
              {x.nonce}
            </Span>
          ),
        },
      ]}
    />
  );
};
