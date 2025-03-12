import { UserDocument } from "@core/types/users/UserDocument";
import { Dates } from "@core/services/dates";
import { Intimal } from "@core/services/intimal";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgUser } from "@client/svgs/common/SvgUser";
import { Table } from "@client/comps/table/Table";
import { Div } from "@client/comps/div/Div";
import { Users } from "#app/services/users";
import { Affiliates } from "#app/services/affiliates";

export const AffiliateTable = ({
  users,
  isLoading,
}: {
  users: UserDocument[];
  isLoading: boolean;
}) => {
  return (
    <Table
      data={users}
      loading={isLoading}
      emptyMessage="No affiliates found."
      onRowProps={(x) => ({
        type: "router",
        to: `/users/${x._id}/referrals`,
      })}
      columns={[
        {
          heading: "Affiliate",
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => {
            const role = Users.getRoleInfo(x.role);
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
                  {x.username}
                </Span>
                <Span weight="medium">{"["}</Span>
                <Span
                  weight="medium"
                  color="yellow"
                >
                  {Users.getLevel(x.xp)}
                </Span>
                <Span weight="medium">{"]"}</Span>
              </Div>
            );
          },
        },
        {
          heading: "ID",
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => <Span>{x._id}</Span>,
        },
        {
          heading: "Tier",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              color="white"
            >
              {Affiliates.getTier(x.affiliate.referralXp)}
              {x.affiliate.baseTier && ` (${x.affiliate.baseTier}B)`}
            </Span>
          ),
        },
        {
          heading: "Referrals",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              family="title"
              weight="bold"
              color="white"
            >
              {x.affiliate.referralCount}
            </Span>
          ),
        },
        {
          heading: "Balance",
          grow: 3,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              family="title"
              weight="bold"
              color="yellow"
            >
              {Intimal.toLocaleString(x.affiliate.commissionBalance)}
            </Span>
          ),
        },
        {
          heading: "Earnings",
          grow: 3,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              family="title"
              weight="bold"
              color="light-green"
            >
              {Intimal.toLocaleString(x.affiliate.commissionTotal)}
            </Span>
          ),
        },
        {
          heading: "Active",
          grow: 3,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              color="light-blue"
            >
              {Dates.toElapsedString(x.meta.activeDate, false)}
            </Span>
          ),
        },
      ]}
    />
  );
};
