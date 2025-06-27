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
import { useTranslation } from "@core/services/internationalization/internationalization";

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
  const { t } = useTranslation(["fairness"]);
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage={t("transactions.notFound")}
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <FairnessCaseGameModal result={x} />),
      })}
      columns={[
        {
          heading: t('transactions.headers.game'),
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
                {x.chest.displayName}
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
          heading: t('transactions.headers.result'),
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
                  color="light-sand"
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

export const TabletTable = ({ results, isLoading }: CaseGameTableProps) => {
  const { t } = useTranslation(["fairness"]);
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage={t("transactions.notFound")}
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <FairnessCaseGameModal result={x} />),
      })}
      columns={[
        {
          heading: t('transactions.headers.gameId'),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="light-sand">{x.gameId}</Span>,
        },
        {
          heading: t('transactions.headers.date'),
          grow: 4,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span color="light-sand">{Dates.toTimestamp(x.timestamp)}</Span>
          ),
        },
        {
          heading: t('transactions.headers.case'),
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
              style={{ maxWidth: "100px" }}
            >
              {x.chest.displayName}
            </Span>
          ),
        },
        {
          heading: t('transactions.headers.item'),
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
              style={{ maxWidth: "100px" }}
            >
              {Items.getName(x.loot)}
            </Span>
          ),
        },
        {
          heading: t('transactions.headers.won'),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Tokens value={x.loot.lootValue} />,
        },
        {
          heading: t('transactions.headers.input'),
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

export const LaptopDesktopTable = ({
  results,
  isLoading,
}: CaseGameTableProps) => {
  const { t } = useTranslation(["fairness"]);
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage={t("transactions.notFound")}
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <FairnessCaseGameModal result={x} />),
      })}
      columns={[
        {
          heading: t('transactions.headers.gameId'),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="light-sand" size={12}>{x.gameId}</Span>,
        },
        {
          heading: t('transactions.headers.date'),
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span color="light-sand" size={12} style={{minWidth:'100px'}}>{Dates.toTimestamp(x.timestamp)}</Span>
          ),
        },
        {
          heading: t('transactions.headers.case'),
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
              size={12}
              style={{ maxWidth: "90px" }}
            >
              {x.chest.displayName}
            </Span>
          ),
        },
        {
          heading: t('transactions.headers.roll'),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="light-sand" size={12}>{x.roll}</Span>,
        },
        {
          heading: t('transactions.headers.item'),
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
              size={12}
              style={{ maxWidth: "90px" }}
            >
              {Items.getName(x.loot)}
            </Span>
          ),
        },
        {
          heading: t('transactions.headers.won'),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Tokens fontSize={12} value={x.loot.lootValue} />,
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
          heading: t('transactions.headers.serverSeed'),
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color={x.serverSeed ? "light-sand" : "sand"}
              textOverflow="ellipsis"
              style={{ maxWidth: "90px" }}
              size={12}
            >
              {x.serverSeed ? x.serverSeed : x.serverSeedHashed}
            </Span>
          ),
        },
        {
          heading: t('transactions.headers.nonce'),
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
