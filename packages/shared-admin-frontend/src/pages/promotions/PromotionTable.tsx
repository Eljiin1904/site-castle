import { PromotionCodeDocument } from "@core/types/economy/PromotionCodeDocument";
import { Dates } from "@core/services/dates";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { SvgCertificate } from "@client/svgs/common/SvgCertificate";
import { Economy } from "#app/services/economy";

export const PromotionTable = ({
  promotions,
  isLoading,
  onItemClick,
}: {
  promotions: PromotionCodeDocument[];
  isLoading: boolean;
  onItemClick: (x: PromotionCodeDocument) => void;
}) => {
  return (
    <Table
      data={promotions}
      loading={isLoading}
      emptyMessage="No codes found."
      onRowProps={(x) => ({
        type: "action",
        onClick: () => onItemClick(x),
      })}
      columns={[
        {
          heading: "Promotion",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Div>
              <Vector
                as={SvgCertificate}
                color="gold"
                mr={8}
              />
              <Span
                weight="medium"
                color="light-gray"
                mr={4}
              >
                {x._id}
              </Span>
            </Div>
          ),
        },
        {
          heading: "Tokens",
          grow: 1,
          justify: "flex-start",
          rowRenderer: (x) => <Tokens value={x.tokenAmount} />,
        },
        {
          heading: "Used",
          grow: 1,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              family="title"
              weight="bold"
              color="light-blue"
            >
              {`${x.uses}/${x.maxUses}`}
            </Span>
          ),
        },
        {
          heading: "Start",
          grow: 1,
          justify: "flex-start",
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
          grow: 1,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              color="white"
            >
              {Dates.toTimestamp(x.endDate)}
            </Span>
          ),
        },
        {
          heading: "Status",
          grow: 1,
          justify: "flex-end",
          rowRenderer: (x) => {
            const status = Economy.getPromoStatusInfo(x);
            return (
              <Span
                weight="medium"
                color={status.color}
              >
                {status.label}
              </Span>
            );
          },
        },
      ]}
    />
  );
};
