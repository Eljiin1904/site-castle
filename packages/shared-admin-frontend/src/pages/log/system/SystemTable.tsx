import { Strings } from "@core/services/strings";
import { Dates } from "@core/services/dates";
import { SystemLogDocument } from "@core/types/system/SystemLogDocument";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";

export const SystemTable = ({
  log,
  isLoading,
}: {
  log: SystemLogDocument[];
  isLoading: boolean;
}) => {
  return (
    <Table
      data={log}
      loading={isLoading}
      emptyMessage="No entries found."
      columns={[
        {
          heading: "System",
          grow: 1,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              color="white"
            >
              {Strings.kebabToTitle(x.system)}
            </Span>
          ),
        },
        {
          heading: "Timestamp",
          grow: 1,
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
          heading: "Message",
          grow: 5,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="light-gray">{x.message}</Span>,
        },
      ]}
    />
  );
};
