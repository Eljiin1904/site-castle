import { Dates } from "@core/services/dates";
import { Strings } from "@core/services/strings";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Div } from "@client/comps/div/Div";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Dialogs } from "@client/services/dialogs";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { CrashResult } from "@core/types/crash/CrashResult";
import { FairnessCrashModal } from "#app/modals/fairness/FairnessCrashModal";

type CrashTableProps = {
  results: CrashResult[];
  isLoading: boolean;
};

export const CrashTable = (props: CrashTableProps) => {
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

const MobileTable = ({ results, isLoading }: CrashTableProps) => {
  const { t } = useTranslation(["fairness"]);
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage={t("transactions.notFound")}
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <FairnessCrashModal result={x} />),
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
                {`${x.cashoutMultiplier}x`}
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
              <Span color="light-sand">{x.multiplier}x</Span>
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

export const TabletTable = ({ results, isLoading }: CrashTableProps) => {
  const { t } = useTranslation(["fairness"]);
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage={t("transactions.notFound")}
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <FairnessCrashModal result={x} />),
      })}
      columns={[
        {
          heading: t("transactions.headers.gameId"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="light-sand">{x.gameId}</Span>,
        },
        {
          heading: t("transactions.headers.cashoutAt"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
              size={12}
            >
              {x.cashoutMultiplier ? `${x.cashoutMultiplier}x` : "--"}
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.roundMultiplier"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              size={12}
              textOverflow="ellipsis"
            >
              {x.multiplier}x
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.roundId"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="light-sand" size={12}>{x.roundId}</Span>,
        },
        {
          heading: t("transactions.headers.serverHash"),
          grow: 2,
          justify: "flex-start",

          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
              style={{ maxWidth: "90px" }}
            >
              {x.serverHash}
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.clientHash"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
              style={{ maxWidth: "90px" }}
            >
              {x.clientHash}
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
}: CrashTableProps) => {
  const { t } = useTranslation(["fairness"]);
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage={t("transactions.notFound")}
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <FairnessCrashModal result={x} />),
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
            <Span color="light-sand" size={12} style={{minWidth: '100px'}}>{Dates.toTimestamp(x.timestamp)}</Span>
          ),
        },
        {
          heading: t("transactions.headers.cashoutAt"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
              size={12}
            >
              {x.cashoutMultiplier ? `${x.cashoutMultiplier}x` : "--"}
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.roundMultiplier"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              size={12}
              textOverflow="ellipsis"
            >
              {x.multiplier}x
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.roundId"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="light-sand" size={12}>{x.roundId}</Span>,
        },
        {
          heading: t("transactions.headers.serverHash"),
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
              style={{ maxWidth: "90px" }}
              size={12}
            >
              {Strings.kebabToTitle(`${x.serverHash}`)}
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.clientHash"),
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
              style={{ maxWidth: "90px" }}
              size={12}
            >
              {x.clientHash}
            </Span>
          ),
        },
      ]}
    />
  );
};
