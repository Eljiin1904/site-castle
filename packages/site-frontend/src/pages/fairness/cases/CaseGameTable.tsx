import { ChestGameResult } from "@core/types/chests/ChestGameResult";
import { Dates } from "@core/services/dates";
import { Items } from "@core/services/items";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Div } from "@client/comps/div/Div";
import { Button } from "@client/comps/button/Button";
import { SvgExternal } from "@client/svgs/common/SvgExternal";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Dialogs } from "@client/services/dialogs";
import { FairnessCaseGameModal } from "#app/modals/fairness/FairnessCaseGameModal";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

type CaseGameTableProps = {
  results: ChestGameResult[];
  isLoading: boolean;
};

export const CaseGameTable = (props: CaseGameTableProps) => {
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

const MobileTable = ({ results, isLoading }: CaseGameTableProps) => {
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage="No results found."
      onRowProps={(x) => ({
        type: "action",
        onClick: () => Dialogs.open("primary", <FairnessCaseGameModal result={x} />),
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
                {x.chest.displayName}
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
              <Div gap={2}>
                <Span
                  size={12}
                  textOverflow="ellipsis"
                  style={{ maxWidth: "90px" }}
                >
                  {Items.getName(x.loot)}
                </Span>
                <Tokens
                  value={x.loot.lootValue}
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

export const TabletTable = ({ results, isLoading }: CaseGameTableProps) => {
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage="No results found."
      onRowProps={(x) => ({
        type: "action",
        onClick: () => Dialogs.open("primary", <FairnessCaseGameModal result={x} />),
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
          heading: "Case",
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="white"
              textOverflow="ellipsis"
              style={{ maxWidth: "100px" }}
            >
              {x.chest.displayName}
            </Span>
          ),
        },
        {
          heading: "Item",
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="white"
              textOverflow="ellipsis"
              style={{ maxWidth: "100px" }}
            >
              {Items.getName(x.loot)}
            </Span>
          ),
        },
        {
          heading: "Won",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Tokens value={x.loot.lootValue} />,
        },
        {
          heading: "Input",
          grow: 1,
          justify: "flex-end",
          rowRenderer: () => (
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

export const LaptopDesktopTable = ({ results, isLoading }: CaseGameTableProps) => {
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage="No results found."
      onRowProps={(x) => ({
        type: "action",
        onClick: () => Dialogs.open("primary", <FairnessCaseGameModal result={x} />),
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
          heading: "Case",
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="white"
              textOverflow="ellipsis"
              style={{ maxWidth: "100px" }}
            >
              {x.chest.displayName}
            </Span>
          ),
        },
        {
          heading: "Roll",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="white">{x.roll}</Span>,
        },
        {
          heading: "Item",
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="white"
              textOverflow="ellipsis"
              style={{ maxWidth: "100px" }}
            >
              {Items.getName(x.loot)}
            </Span>
          ),
        },
        {
          heading: "Won",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Tokens value={x.loot.lootValue} />,
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
