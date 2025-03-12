import { HolidayEventDocument } from "@core/types/rewards/HolidayEventDocument";
import { Dates } from "@core/services/dates";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { SvgStar } from "@client/svgs/common/SvgStar";

export const HolidayTable = ({
  holidays,
  isLoading,
}: {
  holidays: HolidayEventDocument[];
  isLoading: boolean;
}) => {
  return (
    <Table
      data={holidays}
      loading={isLoading}
      emptyMessage="No holidays found."
      onRowProps={(x) => ({
        type: "router",
        to: `/holidays/${x._id}`,
      })}
      columns={[
        {
          heading: "Holiday",
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Div>
              <Vector
                as={SvgStar}
                color="gold"
                mr={8}
              />
              <Span
                weight="medium"
                color="light-gray"
                mr={4}
              >
                {x.displayName}
              </Span>
            </Div>
          ),
        },
        {
          heading: " ID",
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => <Span>{x._id}</Span>,
        },
        {
          heading: "Start",
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
          heading: "End",
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
