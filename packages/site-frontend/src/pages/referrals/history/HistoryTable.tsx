import { Dates } from "@core/services/dates";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Tokens } from "@client/comps/tokens/Tokens";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { AffiliateReportWithMeta } from "@core/types/affiliates/AffiliateReport";

export const HistoryTable = ({
  referrals,
  isLoading,
}: {
  referrals: AffiliateReportWithMeta[];
  isLoading: boolean;
}) => {
  const mainLayout = useAppSelector((x) => x.style.mainLayout);
  const {t} = useTranslation(["referrals"]);
  console.log(referrals);
  //const { username, xp, hideInfo } = useHiddenInfo(bet.user);
  return (
    <Table
      data={referrals}
      loading={isLoading}
      autoScroll={mainLayout === "mobile"}
      emptyMessage={t("history.notFound")}
      hideHeader={mainLayout === "mobile"}
      fx
      columns={[
        {
          hidden: mainLayout !== "mobile",
          heading: t("history.user"),
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Div
              column
              gap={2}
            >
              
            </Div>
          ),
        },
        {
          hidden: mainLayout !== "mobile",
          heading: t("history.headers.user"),
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Div
              column
              align="flex-end"
            >
              
            </Div>
          ),
        },
        {
          hidden: mainLayout === "mobile",
          heading: t("history.headers.user"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span color="light-sand" size={12}>
              {x.user.hidden ? t("common:hidden") : x.user.name}
            </Span>
          ),
        },
        {
          hidden: mainLayout === "mobile",
          heading: t("history.headers.date"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span color="light-sand" size={12}>
              {x.activeDate && Dates.toTimestamp(x.activeDate)}
            </Span>
          ),
        },        
        {
          hidden: mainLayout === "mobile",
          heading: t("history.headers.totalDeposits"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span color="light-sand" size={12}>
             {-1}
            </Span>
          ),
        },
        {
          hidden: mainLayout === "mobile" || mainLayout === "tablet",
          heading:  t("history.headers.lastDeposit"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span color="light-sand" size={12}>
              {x.lastDepositDate && Dates.toTimestamp(x.lastDepositDate)}
            </Span>
          ),
        },
        {
          hidden: mainLayout === "mobile" || mainLayout === "tablet",
          heading:  t("history.headers.wagered"),
          grow: 1,
          justify: "flex-end",
          rowRenderer: (x) => <Tokens fontSize={12} value={x.wagerAmount} />,
        },
        {
          hidden: mainLayout === "mobile",
          heading: t("history.headers.commission"),
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Tokens fontSize={12}
              value={x.commissionAmount}
            />
          ),
        },
        {
          hidden: mainLayout === "mobile",
          heading: t("history.headers.unclaimedCommision"),
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => <Tokens fontSize={12} value={x.commissionAmount} />,
        },
      ]}
    />
  );
};
