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
import { useTranslation } from "@core/services/internationalization/internationalization";

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
  const { t } = useTranslation(["fairness"]);
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage={t("transactions.notFound")}
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <FairnessCaseBattleModal result={x} />),
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
                style={{ maxWidth: "140px" }}
              >
                {Strings.kebabToTitle(x.mode)}
                {x.modifiers.length > 0 &&
                  " - " +
                    x.modifiers.map((n) => Strings.kebabToTitle(n)).join(", ")}
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
                <Span size={12} color="light-sand">
                  {x.winners.map((n) => `P${n + 1}`).join(",")}
                </Span>
                <Tokens
                  value={x.totalWon}
                  fontSize={12}
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

export const TabletTable = ({ results, isLoading }: CaseBattleTableProps) => {
  const {t} = useTranslation(["fairness"]);
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage={t("transactions.notFound")}
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <FairnessCaseBattleModal result={x} />),
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
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span color="light-sand">{Dates.toTimestamp(x.timestamp)}</Span>
          ),
        },
        {
          heading: t("transactions.headers.mode"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
            >
              {Strings.kebabToTitle(x.mode)}
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.modifiers"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
              style={{ maxWidth: "80px" }}
            >
              {x.modifiers.map((n) => Strings.kebabToTitle(n)).join(", ") ||
                "--"}
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.winners"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span color="light-sand">
              {x.winners.map((n) => `P${n + 1}`).join(",")}
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.pot"),
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
  const { t } = useTranslation(["fairness"]);
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage={t("transactions.notFound")}
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <FairnessCaseBattleModal result={x} />),
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
            <Span color="light-sand" size={12} style={{minWidth:'100px'}}>{Dates.toTimestamp(x.timestamp)}</Span>
          ),
        },
        {
          heading: t("transactions.headers.mode"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              size={12}
              textOverflow="ellipsis"
            >
              {Strings.kebabToTitle(x.mode)}
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.modifiers"),
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span color="light-sand" size={12}>
              {x.modifiers.map((n) => Strings.kebabToTitle(n)).join(", ") ||
                "--"}
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.winners"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span color="light-sand" size={12}>
              {x.winners.map((n) => `P${n + 1}`).join(",")}
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.pot"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Tokens fontSize={12} value={x.totalWon} />,
        },
        {
          heading: t("transactions.headers.serverSeed"),
          grow: 3,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              size={12}
              textOverflow="ellipsis"
              style={{ maxWidth: "90px" }}
            >
              {x.serverSeed}
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.eosBlockId"),
          grow: 3,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              size={12}
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
