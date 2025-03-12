import { differenceInDays } from "date-fns";
import { AffiliateReportWithMeta } from "@core/types/affiliates/AffiliateReport";
import { Dates } from "@core/services/dates";
import { Table } from "@client/comps/table/Table";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Vector } from "@client/comps/vector/Vector";
import { Div } from "@client/comps/div/Div";
import { SvgUser } from "@client/svgs/common/SvgUser";
import { Users } from "#app/services/users";

export const ReferralTable = ({
  referrals,
  isLoading,
}: {
  referrals: AffiliateReportWithMeta[];
  isLoading: boolean;
}) => {
  return (
    <Table
      data={referrals}
      loading={isLoading}
      emptyMessage="No referrals found."
      columns={[
        {
          heading: "User",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => {
            const role = Users.getRoleInfo(x.user.role);
            return (
              <Div>
                <Vector
                  as={role?.icon || SvgUser}
                  size={16}
                  color={role?.color || "gray"}
                  mr={8}
                />
                <Span
                  weight="medium"
                  color="white"
                  mr={4}
                >
                  {x.user.name}
                </Span>
                <Span weight="medium">{"["}</Span>
                <Span
                  weight="medium"
                  color="yellow"
                >
                  {Users.getLevel(x.user.xp)}
                </Span>
                <Span weight="medium">{"]"}</Span>
              </Div>
            );
          },
        },
        {
          heading: "Acquired",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span color="light-blue">{Dates.toTimestamp(x.referDate)}</Span>
          ),
        },
        {
          heading: "Last Deposit",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Span {...getDepositText(x.lastDepositDate)} />,
        },
        {
          heading: "Deposited",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => <Tokens value={x.depositAmount} />,
        },
        {
          heading: "Wagered",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => <Tokens value={x.wagerAmount} />,
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

function getDepositText(date: Date | undefined) {
  let children: string = "Never Deposited";
  let color: Color = "gray";

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
