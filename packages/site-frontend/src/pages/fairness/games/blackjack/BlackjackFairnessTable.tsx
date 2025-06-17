import { Dates } from "@core/services/dates";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Div } from "@client/comps/div/Div";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Dialogs } from "@client/services/dialogs";
import { SvgExternal } from "@client/svgs/common/SvgExternal";
import { Button } from "@client/comps/button/Button";
import { Tokens } from "@client/comps/tokens/Tokens";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BlackjackFairnessResult } from "@core/types/blackjack/BlackjackFairnessResult";
import { FairnessBlackjackModal } from "#app/modals/fairness/FairnessBlackjackModal";
import { useTranslation } from "@core/services/internationalization/internationalization";

type BlackjackTableProps = {
  results: BlackjackFairnessResult[];
  isLoading: boolean;
};

export const BlackjackFairnessTable = (props: BlackjackTableProps) => {
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

const MobileTable = ({ results, isLoading }: BlackjackTableProps) => {
  const {t} = useTranslation(["fairness"]);
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage={t("transactions.notFound")}
      onRowProps={(x) => ({
        type: "action",
        onClick: () => Dialogs.open("primary", <FairnessBlackjackModal result={x} />),
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
                style={{ maxWidth: "190px" }}
              >
                {`${x.dealerCards} vs ${x.playerCards}`}
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
                  value={x.totalPayout}
                />
              </Div>
            </Div>
          ),
        },
      ]}
    />
  );
};

const TabletTable = ({ results, isLoading }: BlackjackTableProps) => {
  const { t } = useTranslation(["fairness"]);
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage={t("transactions.notFound")}
      onRowProps={(x) => ({
        type: "action",
        onClick: () => Dialogs.open("primary", <FairnessBlackjackModal result={x} />),
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
          heading: t("transactions.headers.playerCards"),
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
              style={{ maxWidth: "120px" }}
            >
              {x.playerCards}
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.dealerCards"),
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
            >
              {x.dealerCards}
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.winAmount"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Div gap={8}>
              <Tokens
                fontSize={12}
                value={x.totalPayout}
              />
            </Div>
          ),
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

const LaptopDesktopTable = ({ results, isLoading }: BlackjackTableProps) => {
  const { t } = useTranslation(["fairness"]);
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage={t("transactions.notFound")}
      onRowProps={(x) => ({
        type: "action",
        onClick: () => Dialogs.open("primary", <FairnessBlackjackModal result={x} />),
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
          rowRenderer: (x) => <Span color="light-sand" size={12} style={{minWidth: '100px'}}>{Dates.toTimestamp(x.timestamp)}</Span>,
        },
        {
          heading: t("transactions.headers.playerCards"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
              size={12}
              style={{ maxWidth: "100px" }}
            >
              {x.playerCards}
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.dealerCards"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
              size={12}
            >
              {x.dealerCards}
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.winAmount"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Div gap={8}>
              <Tokens
                fontSize={12}
                value={x.totalPayout}
              />
            </Div>
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
              size={12}
              style={{ maxWidth: "100px" }}
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
              size={12}
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
              size={12}
            >
              {x.nonce}
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.step"),
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              color="light-sand"
              size={12}
            >
              {x.step}
            </Span>
          ),
        },
      ]}
    />
  );
};
