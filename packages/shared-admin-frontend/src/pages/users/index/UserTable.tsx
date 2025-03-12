import { UserDocument } from "@core/types/users/UserDocument";
import { Dates } from "@core/services/dates";
import { Intimal } from "@core/services/intimal";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgUser } from "@client/svgs/common/SvgUser";
import { Table } from "@client/comps/table/Table";
import { Div } from "@client/comps/div/Div";
import { Users } from "#app/services/users";

export const UserTable = ({
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
      emptyMessage="No users found."
      onRowProps={(x) => ({
        type: "router",
        to: `/users/${x._id}`,
      })}
      columns={[
        {
          heading: "User",
          grow: 4,
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
                  color="white"
                  mr={4}
                >
                  {x.username}
                </Span>
                <Span>{"["}</Span>
                <Span
                  weight="medium"
                  color="yellow"
                >
                  {Users.getLevel(x.xp)}
                </Span>
                <Span>{"]"}</Span>
              </Div>
            );
          },
        },
        {
          heading: "Referred by",
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-orange"
              textOverflow="ellipsis"
              style={{ maxWidth: "120px" }}
            >
              {Users.getRefererString(x.referer)}
            </Span>
          ),
        },
        {
          heading: "Email",
          grow: 4,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              textOverflow="ellipsis"
              style={{ maxWidth: "180px" }}
            >
              {x.email}
            </Span>
          ),
        },
        {
          heading: "Last IP",
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              color="light-purple"
              textOverflow="ellipsis"
              style={{ maxWidth: "120px" }}
            >
              {x.meta.lastLocation?.ip || "Unknown"}
            </Span>
          ),
        },
        {
          heading: "Balance",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              family="title"
              weight="bold"
              color="yellow"
            >
              {Intimal.toLocaleString(x.tokenBalance)}
            </Span>
          ),
        },
        {
          heading: "PL",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              family="title"
              weight="bold"
              color={(x.stats.profitLoss || 0) > 0 ? "green" : "light-red"}
            >
              {(x.stats.profitLoss || 0) > 0 && "+"}
              {Intimal.toLocaleString(x.stats.profitLoss || 0)}
            </Span>
          ),
        },
        {
          heading: "Wagered",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              family="title"
              weight="bold"
              color="white"
            >
              {Intimal.toLocaleString(x.stats.wagerAmount || 0)}
            </Span>
          ),
        },
        {
          heading: "Active",
          grow: 3,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span color="light-blue">
              {Dates.toElapsedString(x.meta.activeDate, false)}
            </Span>
          ),
        },
      ]}
    />
  );
};
