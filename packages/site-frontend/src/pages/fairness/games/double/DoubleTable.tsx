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
import { useTranslation } from "@core/services/internationalization/internationalization";

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
  const { t } = useTranslation(["fairness"]);
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage={t("transactions.notFound")}
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <FairnessDoubleModal result={x} />),
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
              >
                {Double.getLabelFromBetKind(x.betKind)}
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
                <Span fontSize={12}  color="light-sand">
                  {`${x.roll.value} - ${Double.getLabelFromRoll(x.roll.value)}`}
                </Span>
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

export const TabletTable = ({ results, isLoading }: DoubleTableProps) => {
  const { t } = useTranslation(["fairness"]);
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage={t("transactions.notFound")}
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <FairnessDoubleModal result={x} />),
      })}
      columns={[
        {
          heading: t("transactions.headers.gameId"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="light-sand">{x.gameId}</Span>,
        },
        {
          heading: t("transactions.headers.bet"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span color="light-sand">{Double.getLabelFromBetKind(x.betKind)}</Span>
          ),
        },
        {
          heading: t("transactions.headers.roll"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="light-sand">{x.roll.value}</Span>,
        },
        {
          heading: t("transactions.headers.result"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span color="light-sand">{Double.getLabelFromRoll(x.roll.value)}</Span>
          ),
        },
        {
          heading: t("transactions.headers.serverSeed"),
          grow: 2,
          justify: "flex-start",

          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
              style={{ maxWidth: "90px" }}
            >
              {x.serverSeed}
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.eosBlockId"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
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
  const { t } = useTranslation(["fairness"]);
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage={t("transactions.notFound")}
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <FairnessDoubleModal result={x} />),
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
          heading: t("transactions.headers.bet"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
              size={12}
            >
              {Double.getLabelFromBetKind(x.betKind)}
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.roll"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="light-sand" size={12}>{x.roll.value}</Span>,
        },
        {
          heading: t("transactions.headers.result"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              size={12}
              textOverflow="ellipsis"
            >
              {Double.getLabelFromRoll(x.roll.value)}
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
          heading: t("transactions.headers.serverSeed"),
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
              style={{ maxWidth: "90px" }}
              size={12}
            >
              {Strings.kebabToTitle(`${x.serverSeed}`)}
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.eosBlockId"),
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
              style={{ maxWidth: "90px" }}
              size={12}
            >
              {x.eosBlockId}
            </Span>
          ),
        },
      ]}
    />
  );
};
