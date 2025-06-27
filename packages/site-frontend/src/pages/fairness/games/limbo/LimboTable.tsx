import { Dates } from "@core/services/dates";
import { Numbers } from "@core/services/numbers";
import { LimboResult } from "@core/types/limbo/LimboResult";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Div } from "@client/comps/div/Div";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Dialogs } from "@client/services/dialogs";
import { SvgExternal } from "@client/svgs/common/SvgExternal";
import { Button } from "@client/comps/button/Button";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { FairnessLimboModal } from "#app/modals/fairness/FairnessLimboModal";
import { useTranslation } from "@core/services/internationalization/internationalization";

type LimboTableProps = {
  results: LimboResult[];
  isLoading: boolean;
};

export const LimboTable = (props: LimboTableProps) => {
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

const MobileTable = ({ results, isLoading }: LimboTableProps) => {
  const {t} = useTranslation(["fairness"]);
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage={t("transactions.notFound")}
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <FairnessLimboModal result={x} />),
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
                {`${Numbers.round(x.multiplier, 2)}x`}
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
              <Span color="light-sand">{`${Numbers.floor(x.rollMultiplier, 2)}x`}</Span>
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
export const TabletTable = ({ results, isLoading }: LimboTableProps) => {
  const {t} = useTranslation(["fairness","account"]);
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage={t("transactions.notFound")}
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <FairnessLimboModal result={x} />),
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
             {`${Numbers.round(x.multiplier, 2)}x`}
            </Span>
          ),
        },
        {
          heading: t("transactions.headers.roll"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="light-sand">{`${Numbers.floor(x.rollMultiplier, 2)}x`}</Span>,
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

export const LaptopDesktopTable = ({ results, isLoading }: LimboTableProps) => {
  const {t} = useTranslation(["fairness"]);
  return (
    <Table
      data={results}
      loading={isLoading}
      emptyMessage={t("transactions.notFound")}
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <FairnessLimboModal result={x} />),
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
          heading: t("transactions.headers.target"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
              size={12}
            >
              {`${Numbers.round(x.multiplier, 2)}x`}
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
          heading: t("transactions.headers.multiplier"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-sand"
              textOverflow="ellipsis"
              size={12}
            >
              {`${Numbers.floor(x.rollMultiplier, 2)}x`}
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