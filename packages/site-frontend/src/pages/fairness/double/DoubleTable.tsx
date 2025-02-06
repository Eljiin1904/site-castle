import { Dates } from "@core/services/dates";
import { Strings } from "@core/services/strings";
import { DoubleResult } from "@core/types/double/DoubleResults";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Div } from "@client/comps/div/Div";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Dialogs } from "@client/services/dialogs";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { FairnessDoubleModal } from "#app/modals/fairness/FairnessDoubleModal";
import { Double } from "#app/services/double";

type DoubleTableProps = {
  results: DoubleResult[];
  isLoading: boolean;
};

export const DoubleTable = (props: DoubleTableProps) => {
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

const MobileTable = ({ results, isLoading }: DoubleTableProps) => {
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage="No results found."
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <FairnessDoubleModal result={x} />),
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
              >
                {Double.getLabelFromBetKind(x.betKind)}
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
                <Span fontSize={12}>
                  {`${x.roll.value} - ${Double.getLabelFromRoll(x.roll.value)}`}
                </Span>
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

export const TabletTable = ({ results, isLoading }: DoubleTableProps) => {
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage="No results found."
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <FairnessDoubleModal result={x} />),
      })}
      columns={[
        {
          heading: "Game ID",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="white">{x.gameId}</Span>,
        },
        {
          heading: "Bet",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span color="white">{Double.getLabelFromBetKind(x.betKind)}</Span>
          ),
        },
        {
          heading: "Roll",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="white">{x.roll.value}</Span>,
        },
        {
          heading: "Result",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span color="white">{Double.getLabelFromRoll(x.roll.value)}</Span>
          ),
        },
        {
          heading: "Server Seed",
          grow: 2,
          justify: "flex-start",

          rowRenderer: (x) => (
            <Span
              color="white"
              textOverflow="ellipsis"
              style={{ maxWidth: "90px" }}
            >
              {x.serverSeed}
            </Span>
          ),
        },
        {
          heading: "EOS Block Id",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="white"
              textOverflow="ellipsis"
              style={{ maxWidth: "90px" }}
            >
              {x.eosBlockId}
            </Span>
          ),
        },
      ]}
    />
  );
};

export const LaptopDesktopTable = ({
  results,
  isLoading,
}: DoubleTableProps) => {
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage="No results found."
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <FairnessDoubleModal result={x} />),
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
          heading: "Bet",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="white"
              textOverflow="ellipsis"
            >
              {Double.getLabelFromBetKind(x.betKind)}
            </Span>
          ),
        },
        {
          heading: "Roll",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="white">{x.roll.value}</Span>,
        },
        {
          heading: "Result",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="white"
              textOverflow="ellipsis"
            >
              {Double.getLabelFromRoll(x.roll.value)}
            </Span>
          ),
        },
        {
          heading: "Round ID",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="white">{x.roundId}</Span>,
        },
        {
          heading: "Server Seed",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              color="white"
              textOverflow="ellipsis"
              style={{ maxWidth: "100px" }}
            >
              {Strings.kebabToTitle(`${x.serverSeed}`)}
            </Span>
          ),
        },
        {
          heading: "EOS Block Id",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              color="white"
              textOverflow="ellipsis"
              style={{ maxWidth: "100px" }}
            >
              {x.eosBlockId}
            </Span>
          ),
        },
      ]}
    />
  );
};
