import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { Dates } from "@core/services/dates";
import { Div } from "@client/comps/div/Div";
import { Users } from "@core/services/users";
import "./TicketTable.scss";

export const TicketTable = ({
  tickets,
  isLoading,
}: {
  tickets: TransactionDocument[];
  isLoading: boolean;
}) => {
  return (
    <Table
      className="TicketTable"
      data={tickets}
      loading={isLoading}
      emptyMessage="No tickets found."
      columns={[
        {
          heading: "User",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Div>
              <Span
                weight="medium"
                size={12}
                color="light-blue"
                mr={4}
              >
                {x.user.name}
              </Span>
              <Span
                weight="medium"
                size={12}
              >
                {"["}
              </Span>
              <Span
                weight="medium"
                size={12}
                color="yellow"
              >
                {Users.getLevel(x.user.xp)}
              </Span>
              <Span
                weight="medium"
                size={12}
              >
                {"]"}
              </Span>
            </Div>
          ),
        },
        {
          heading: "Timestamp",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              size={12}
              color="white"
            >
              {Dates.toTimestamp(x.timestamp)}
            </Span>
          ),
        },
      ]}
    />
  );
};
