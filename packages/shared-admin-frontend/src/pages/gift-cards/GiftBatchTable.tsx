import { GiftBatchDocument } from "@core/types/economy/GiftBatchDocument";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Dialogs } from "@client/services/dialogs";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { SvgCard } from "@client/svgs/common/SvgCard";
import { GiftBatchModal } from "#app/modals/gift-batch/GiftBatchModal";
import { Economy } from "#app/services/economy";

export const GiftBatchTable = ({
  batches,
  isLoading,
}: {
  batches: GiftBatchDocument[];
  isLoading: boolean;
}) => {
  return (
    <Table
      data={batches}
      loading={isLoading}
      emptyMessage="No batches found."
      onRowProps={(x) => ({
        type: "action",
        onClick: () => Dialogs.open("primary", <GiftBatchModal batch={x} />),
      })}
      columns={[
        {
          heading: "Batch",
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Div>
              <Vector
                as={SvgCard}
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
          heading: "Tag",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              color="light-green"
            >
              {Economy.getGiftTagName(x.tag)}
            </Span>
          ),
        },
        {
          heading: "Tokens",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => <Tokens value={x.tokenAmount} />,
        },
        {
          heading: "Used",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              family="title"
              weight="bold"
              color="light-blue"
            >
              {`${x.usedCount}/${x.createdCount}`}
            </Span>
          ),
        },
        {
          heading: "Last Used",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              color="white"
            >
              {x.lastUseDate
                ? x.lastUseDate.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })
                : "Never"}
            </Span>
          ),
        },
      ]}
    />
  );
};
