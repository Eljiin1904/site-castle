import { CaseBattleResult } from "@core/types/case-battles/CaseBattleResult";
import { Dates } from "@core/services/dates";
import { Strings } from "@core/services/strings";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Div } from "@client/comps/div/Div";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Dialogs } from "@client/services/dialogs";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { FairnessCaseBattleModal } from "#app/modals/fairness/FairnessCaseBattleModal";

type CaseBattleTableProps = {
  results: CaseBattleResult[];
  isLoading: boolean;
};

export const CaseBattlesTable = (props: CaseBattleTableProps) => {
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

const MobileTable = ({ results, isLoading }: CaseBattleTableProps) => {
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage="No results found."
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <FairnessCaseBattleModal result={x} />),
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
                style={{ maxWidth: "140px" }}
              >
                {Strings.kebabToTitle(x.mode)}
                {x.modifiers.length > 0 &&
                  " - " +
                    x.modifiers.map((n) => Strings.kebabToTitle(n)).join(", ")}
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
                <Span size={12}>
                  {x.winners.map((n) => `P${n + 1}`).join(",")}
                </Span>
                <Tokens
                  value={x.totalWon}
                  fontSize={12}
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

export const TabletTable = ({ results, isLoading }: CaseBattleTableProps) => {
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage="No results found."
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <FairnessCaseBattleModal result={x} />),
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
          heading: "Mode",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="white"
              textOverflow="ellipsis"
            >
              {Strings.kebabToTitle(x.mode)}
            </Span>
          ),
        },
        {
          heading: "Modifiers",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="white"
              textOverflow="ellipsis"
              style={{ maxWidth: "80px" }}
            >
              {x.modifiers.map((n) => Strings.kebabToTitle(n)).join(", ") ||
                "--"}
            </Span>
          ),
        },
        {
          heading: "Winner(s)",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span color="white">
              {x.winners.map((n) => `P${n + 1}`).join(",")}
            </Span>
          ),
        },
        {
          heading: "Pot",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Tokens value={x.totalWon} />,
        },
      ]}
    />
  );
};

export const LaptopDesktopTable = ({
  results,
  isLoading,
}: CaseBattleTableProps) => {
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage="No results found."
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <FairnessCaseBattleModal result={x} />),
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
          heading: "Mode",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="white"
              textOverflow="ellipsis"
            >
              {Strings.kebabToTitle(x.mode)}
            </Span>
          ),
        },
        {
          heading: "Modifiers",
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span color="white">
              {x.modifiers.map((n) => Strings.kebabToTitle(n)).join(", ") ||
                "--"}
            </Span>
          ),
        },
        {
          heading: "Winner(s)",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span color="white">
              {x.winners.map((n) => `P${n + 1}`).join(",")}
            </Span>
          ),
        },
        {
          heading: "Pot",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Tokens value={x.totalWon} />,
        },
        {
          heading: "Server Seed",
          grow: 3,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              color="white"
              textOverflow="ellipsis"
              style={{ maxWidth: "100px" }}
            >
              {x.serverSeed}
            </Span>
          ),
        },
        {
          heading: "EOS Block ID",
          grow: 3,
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
