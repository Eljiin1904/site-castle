import { RewardBoostEventDocument } from "@core/types/rewards/RewardBoostEventDocument";
import { Strings } from "@core/services/strings";
import { Dates } from "@core/services/dates";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { SvgHistory } from "@client/svgs/common/SvgHistory";

export const BoostEventTable = ({
  events,
  isLoading,
  onItemClick,
}: {
  events: RewardBoostEventDocument[];
  isLoading: boolean;
  onItemClick: (x: RewardBoostEventDocument) => void;
}) => {
  return (
    <Table
      data={events}
      loading={isLoading}
      emptyMessage="No events found."
      onRowProps={(x) => ({
        type: "action",
        onClick: () => onItemClick(x),
      })}
      columns={[
        {
          heading: "Event",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Div>
              <Vector
                as={SvgHistory}
                color={x.timeframe === "weekly" ? "cyan" : "gold"}
                mr={8}
              />
              <Span
                weight="medium"
                color="light-gray"
                mr={4}
              >
                {Strings.kebabToTitle(x.timeframe)}
              </Span>
            </Div>
          ),
        },
        {
          heading: "ID",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Span>{x._id}</Span>,
        },
        {
          heading: "Unlocks",
          grow: 3,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              color="white"
            >
              {Dates.toTimestamp(x.startDate)}
            </Span>
          ),
        },
        {
          heading: "Locks",
          grow: 3,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              color="white"
            >
              {Dates.toTimestamp(x.endDate)}
            </Span>
          ),
        },
      ]}
    />
  );
};
