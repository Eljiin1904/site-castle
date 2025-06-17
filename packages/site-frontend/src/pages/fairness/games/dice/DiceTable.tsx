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
import { useTranslation } from "@core/services/internationalization/internationalization";

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
  const {t} = useTranslation(["fairness"]);
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage={t("transactions.notFound")}
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <FairnessDiceModal result={x} />),
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
                {`${x.targetValue} - ${Strings.kebabToTitle(x.targetKind)}`}
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
              <Span color="light-sand">{x.rollValue}</Span>
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

export const TabletTable = ({ results, isLoading }: DiceTableProps) => {
  const {t} = useTranslation(["fairness","account"]);
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage={t("transactions.notFound")}
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <FairnessDiceModal result={x} />),
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
          rowRenderer: (x) => (
            <Span color="light-sand">{Dates.toTimestamp(x.timestamp)}</Span>
          ),
        },
        {
          heading: t("transactions.headers.target"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
            >
              {`${x.targetValue} - ${Strings.kebabToTitle(x.targetKind)}`}
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.roll"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="light-sand">{x.rollValue}</Span>,
        },
        {
          heading: t("transactions.headers.input"),
          grow: 1,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Button
              kind="tertiary-grey"
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
  const {t} = useTranslation(["fairness","account"]);
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage={t("transactions.notFound")}
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <FairnessDiceModal result={x} />),
      })}
      columns={[
        {
          heading: t("transactions.headers.gameId"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="light-sand" size={12}>{x.gameId}</Span>,
        },
        {
          heading: t("transactions.headers.date"),
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span style={{ minWidth: "100px" }} color="light-sand" size={12}>{Dates.toTimestamp(x.timestamp)}</Span>
          ),
        },
        {
          heading: t("transactions.headers.target"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
              size={12}
            >
              {`${x.targetValue} - ${Strings.kebabToTitle(x.targetKind)}`}
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.multiplier"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
              size={12}
            >
              {`${Numbers.round(x.multiplier, 4)}x`}
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.roll"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="light-sand" size={12}>{x.rollValue}</Span>,
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
              style={{ maxWidth: "80px" }}
              size={12}
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
              size={12}
            >
              {x.nonce}
            </Span>
          ),
        },
      ]}
    />
  );
};