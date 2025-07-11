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
import { useTranslation } from "@core/services/internationalization/internationalization";

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
  const {t} = useTranslation(["fairness"]);
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage={t("transactions.notFound")}
      onRowProps={(x) => ({
        type: "action",
        onClick: () => Dialogs.open("primary", <FairnessMinesModal result={x} />),
      })}
      columns={[
        {
          heading: t("transactions.headers.game"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Div
              column
              gap={2}
            >
              <Span
                size={12}
                color="light-sand"
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
                color="light-sand"
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
          heading: t("transactions.headers.result"),
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Div
              column
              align="flex-end"
              gap={2}
            >
              <Div gap={8}>
                <Tokens
                  fontSize={12}
                  value={x.wonAmount}
                />
              </Div>
              <Span
                color="sand"
                size={12}
              >
                {t("transactions.viewInputs")}
              </Span>
            </Div>
          ),
        },
      ]}
    />
  );
};

const TabletTable = ({ results, isLoading }: MinesTableProps) => {
  const {t} = useTranslation(["fairness"]);
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage={t("transactions.notFound")}
      onRowProps={(x) => ({
        type: "action",
        onClick: () => Dialogs.open("primary", <FairnessMinesModal result={x} />),
      })}
      columns={[
        {
          heading: t("transactions.headers.gameId"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="light-sand">{x.gameId}</Span>,
        },
        {
          heading: t("transactions.headers.date"),
          grow: 4,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="light-sand">{Dates.toTimestamp(x.timestamp)}</Span>,
        },
        {
          heading: t("transactions.headers.gridSize"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
            >
              {x.gridSize}
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.mineCount"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
            >
              {x.mineCount}
            </Span>
          ),
        }
      ]}
    />
  );
};

const LaptopDesktopTable = ({ results, isLoading }: MinesTableProps) => {
  const {t} = useTranslation(["fairness"]);
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage={t("transactions.notFound")}
      onRowProps={(x) => ({
        type: "action",
        onClick: () => Dialogs.open("primary", <FairnessMinesModal result={x} />),
      })}
      columns={[
        {
          heading: t("transactions.headers.gameId"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="white" size={12}>{x.gameId}</Span>,
        },
        {
          heading: t("transactions.headers.date"),
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="light-sand" size={12} style={{minWidth:'100px'}}>{Dates.toTimestamp(x.timestamp)}</Span>,
        },
        {
          heading: t("transactions.headers.gridSize"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
              size={12}
            >
              {x.gridSize}
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.mineCount"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
              size={12}
            >
              {x.mineCount}
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.clientSeed"),
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
              style={{ maxWidth: "80px" }}
              size={12}
            >
              {x.clientSeed}
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.serverSeed"),
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color={x.serverSeed ? "light-sand" : "sand"}
              textOverflow="ellipsis"
              style={{ maxWidth: "100px" }}
            >
              {x.serverSeed ? x.serverSeed : x.serverSeedHashed}
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.nonce"),
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              color="light-sand"
            >
              {x.nonce}
            </Span>
          ),
        },
      ]}
    />
  );
};
