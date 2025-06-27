import { RaceDocument } from "@core/types/rewards/RaceDocument";
import { Dates } from "@core/services/dates";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Dialogs } from "@client/services/dialogs";
import { RaceInfoModal } from "#app/modals/rewards/RaceInfoModal";
import SvgRace from "@client/svgs/common/SvgRace";

export const RaceTable = ({
  races,
  isLoading,
}: {
  races: RaceDocument[];
  isLoading: boolean;
}) => {
  return (
    <Table
      data={races}
      loading={isLoading}
      emptyMessage="No races found."
      onRowProps={(x) => ({
        type: "action",
        onClick: () => Dialogs.open("primary", <RaceInfoModal race={x} />),
      })}
      columns={[
        {
          heading: "Race",
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Div>
              <Vector
                as={SvgRace}
                color={x.kind === "holiday" ? "bright-green" : "sand"}
                mr={8}
              />
              <Span
                weight="medium"
               
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
          heading: "Total Payout",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Tokens value={x.totalPayout} />,
        },
        {
          heading: "Start",
          grow: 3,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              color="light-sand"
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
              color="light-sand"
            >
              {Dates.toTimestamp(x.endDate)}
            </Span>
          ),
        },
      ]}
    />
  );
};
