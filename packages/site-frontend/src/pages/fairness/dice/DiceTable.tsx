import { Dates } from "@core/services/dates";
import { Strings } from "@core/services/strings";
import { DiceResult } from "@core/types/dice/DiceResult";
import { Numbers } from "@core/services/numbers";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Div } from "@client/comps/div/Div";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Dialogs } from "@client/services/dialogs";
import { SvgExternal } from "@client/svgs/common/SvgExternal";
import { Button } from "@client/comps/button/Button";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { FairnessDiceModal } from "#app/modals/fairness/FairnessDiceModal";

type DiceTableProps = {
  results: DiceResult[];
  isLoading: boolean;
};

export const DiceTable = (props: DiceTableProps) => {
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

const MobileTable = ({ results, isLoading }: DiceTableProps) => {
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage="No results found."
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <FairnessDiceModal result={x} />),
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
                {`${x.targetValue} - ${Strings.kebabToTitle(x.targetKind)}`}
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
              <Span color="white">{x.rollValue}</Span>
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

export const TabletTable = ({ results, isLoading }: DiceTableProps) => {
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage="No results found."
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <FairnessDiceModal result={x} />),
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
          rowRenderer: (x) => (
            <Span color="white">{Dates.toTimestamp(x.timestamp)}</Span>
          ),
        },
        {
          heading: "Target",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="white"
              textOverflow="ellipsis"
            >
              {`${x.targetValue} - ${Strings.kebabToTitle(x.targetKind)}`}
            </Span>
          ),
        },
        {
          heading: "Roll",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="white">{x.rollValue}</Span>,
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

export const LaptopDesktopTable = ({ results, isLoading }: DiceTableProps) => {
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage="No results found."
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <FairnessDiceModal result={x} />),
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
          rowRenderer: (x) => (
            <Span color="white">{Dates.toTimestamp(x.timestamp)}</Span>
          ),
        },
        {
          heading: "Target",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="white"
              textOverflow="ellipsis"
            >
              {`${x.targetValue} - ${Strings.kebabToTitle(x.targetKind)}`}
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
              {`${Numbers.round(x.multiplier, 4)}x`}
            </Span>
          ),
        },
        {
          heading: "Roll",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="white">{x.rollValue}</Span>,
        },
        {
          heading: "Client Seed",
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="white"
              textOverflow="ellipsis"
              style={{ maxWidth: "100px" }}
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
              style={{ maxWidth: "100px" }}
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
