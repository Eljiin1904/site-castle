import { AffiliateReloadDocument } from "@core/types/affiliates/AffiliateReloadDocument";
import { Dates } from "@core/services/dates";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Div } from "@client/comps/div/Div";
import { Dialogs } from "@client/services/dialogs";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Users } from "#app/services/users";
import { AffiliateReloadEditModal } from "#app/modals/affiliates/AffiliateReloadEditModal";

export const ReloadsTable = ({
  reloads,
  isLoading,
  refetch,
}: {
  reloads: AffiliateReloadDocument[];
  isLoading: boolean;
  refetch: () => void;
}) => {
  return (
    <Table
      data={reloads}
      loading={isLoading}
      emptyMessage="No reloads found."
      onRowProps={(x) => ({
        type: "action",
        onClick: () => {
          Dialogs.open(
            "primary",
            <AffiliateReloadEditModal
              reload={x}
              onSuccess={refetch}
            />,
          );
        },
      })}
      columns={[
        {
          heading: "User",
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => {
            return (
              <Div>
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
          heading: "Token Amount",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Tokens value={x.tokenAmount} />,
        },
        {
          heading: "Daily Reset Time",
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              family="title"
              weight="bold"
              color="light-gray"
            >
              {x.resetDate.toLocaleTimeString()}
            </Span>
          ),
        },
        {
          heading: "Claims",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              family="title"
              weight="bold"
              color="light-blue"
            >
              {x.claimsAvailable}
              {"/"}
              {x.claimsStart}
            </Span>
          ),
        },
        {
          heading: "Last Claimed",
          grow: 3,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              color="light-gray"
            >
              {x.lastClaimDate
                ? Dates.toElapsedString(x.lastClaimDate, false)
                : "Never"}
            </Span>
          ),
        },
      ]}
    />
  );
};
