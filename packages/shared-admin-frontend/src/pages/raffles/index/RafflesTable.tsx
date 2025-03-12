import { RaffleDocument } from "@core/types/rewards/RaffleDocument";
import { Dates } from "@core/services/dates";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { SvgTicket } from "@client/svgs/common/SvgTicket";
import { Tokens } from "@client/comps/tokens/Tokens";

export const RafflesTable = ({
  raffles,
  isLoading,
}: {
  raffles: RaffleDocument[];
  isLoading: boolean;
}) => {
  return (
    <Table
      data={raffles}
      loading={isLoading}
      emptyMessage="No raffles found."
      onRowProps={(x) => ({
        type: "router",
        to: `/raffles/${x._id}`,
      })}
      columns={[
        {
          heading: "Raffle",
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Div>
              <Vector
                as={SvgTicket}
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
          heading: "Total Value",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Tokens value={x.totalValue} />,
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
