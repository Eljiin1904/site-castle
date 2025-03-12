import { Dates } from "@core/services/dates";
import { Strings } from "@core/services/strings";
import { UserActionDocument } from "@core/types/users/UserActionDocument";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Div } from "@client/comps/div/Div";
import { Users } from "#app/services/users";

export const ActionsTable = ({
  actions,
  isLoading,
}: {
  actions: UserActionDocument[];
  isLoading: boolean;
}) => {
  return (
    <Table
      data={actions}
      loading={isLoading}
      emptyMessage="No actions found."
      columns={[
        {
          heading: "Type",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              color="white"
            >
              {Users.getActionName(x.kind)}
            </Span>
          ),
        },
        {
          heading: "Timestamp",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              color="white"
            >
              {Dates.toTimestamp(x.timestamp)}
            </Span>
          ),
        },
        {
          heading: "Location",
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              color="light-blue"
            >
              {Users.getLocationString(x.location)}
            </Span>
          ),
        },
        {
          heading: "Data",
          grow: 4,
          justify: "flex-end",
          rowRenderer: getDataContent,
        },
      ]}
    />
  );
};

function getDataContent(action: UserActionDocument) {
  switch (action.kind) {
    case "email-edit":
      return (
        <Div gap={8}>
          <Span color="gray">{"Previous: "}</Span>
          <Span
            weight="medium"
            color="white"
          >
            {action.oldEmail}
          </Span>
        </Div>
      );
    case "login":
    case "register":
      return (
        <Div gap={8}>
          <Span color="gray">{"Strategy: "}</Span>
          <Span
            weight="medium"
            color="white"
          >
            {Strings.kebabToTitle(action.strategy)}
          </Span>
        </Div>
      );
    default:
      return (
        <Span
          weight="medium"
          color="dark-gray"
        >
          {"N/A"}
        </Span>
      );
  }
}
