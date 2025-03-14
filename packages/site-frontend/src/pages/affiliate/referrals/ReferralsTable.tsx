import { differenceInDays } from "date-fns";
import { AffiliateReportWithMeta } from "@core/types/affiliates/AffiliateReport";
import { Strings } from "@core/services/strings";
import { Dates } from "@core/services/dates";
import { Table } from "@client/comps/table/Table";
import { Dialogs } from "@client/services/dialogs";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { SvgCheckCircle } from "@client/svgs/common/SvgCheckCircle";
import { SvgMinusCircle } from "@client/svgs/common/SvgMinusCircle";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { AffiliateReferralModal } from "#app/modals/affiliate/AffiliateReferralModal";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const ReferralsTable = ({
  referrals,
  isLoading,
}: {
  referrals: AffiliateReportWithMeta[];
  isLoading: boolean;
}) => {
  const mainLayout = useAppSelector((x) => x.style.mainLayout);
  const small = useIsMobileLayout();
  return (
    <Table
      data={referrals}
      loading={isLoading}
      emptyMessage="No referrals found."
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <AffiliateReferralModal report={x} />),
      })}
      columns={[
        {
          hidden: !small,
          heading: "User",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Div
              column
              gap={2}
            >
              <Div gap={4}>
                <ReferralUserIcon
                  report={x}
                  size={13}
                />
                <Span
                  weight="medium"
                  size={12}
                  color="white"
                >
                  {x.user.name}
                </Span>
              </Div>
              <Span
                size={12}
                {...getDepositText(x.lastDepositDate)}
              />
            </Div>
          ),
        },
        {
          hidden: small,
          heading: "User",
          grow: 4,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Div gap={6}>
              <ReferralUserIcon report={x} />
              <Span
                weight="medium"
                color="white"
              >
                {Strings.mask(x.user.name, 2)}
              </Span>
            </Div>
          ),
        },
        {
          hidden:small,
          heading: "Time",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span color="light-blue">{Dates.toTimestamp(x.referDate)}</Span>
          ),
        },
        {
          heading: "Earnings",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => <Tokens value={x.rewardAmount} />,
        },
        {
          heading: "Commission",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => <Tokens value={x.commissionAmount} />,
        },
      ]}
    />
  );
};

const ReferralUserIcon = ({
  report,
  size = 16,
}: {
  report: AffiliateReportWithMeta;
  size?: Unit;
}) => {
  if (report.removeDate) {
    return (
      <Vector
        as={SvgMinusCircle}
        size={size}
        color="dark-orange"
        data-tooltip-id="app-tooltip"
        data-tooltip-content={`This user changed their referral on ${Dates.toWeekdayString(report.removeDate)}`}
      />
    );
  } else {
    return (
      <Vector
        as={SvgCheckCircle}
        size={size}
        color="green"
        data-tooltip-id="app-tooltip"
        data-tooltip-content="This user is currently your referral"
      />
    );
  }
};

function getDepositText(date: Date | undefined) {
  let children: string = "Never Deposited";
  let color: Color = "dark-gray";

  if (date) {
    children = Dates.toTimestamp(date);

    const days = differenceInDays(Date.now(), date);

    if (days < 14) {
      color = "green";
    } else if (days < 30) {
      color = "yellow";
    } else {
      color = "light-red";
    }
  }

  return { children, color };
}
