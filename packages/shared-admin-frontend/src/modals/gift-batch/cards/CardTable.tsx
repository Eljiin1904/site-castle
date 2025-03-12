import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { GiftCardDocument } from "@core/types/economy/GiftCardDocument";
import { Dialogs } from "@client/services/dialogs";
import { GiftCardModal } from "#app/modals/gift-card/GiftCardModal";
import "./CardTable.scss";

export const CardTable = ({
  cards,
  isLoading,
}: {
  cards: GiftCardDocument[];
  isLoading: boolean;
}) => {
  return (
    <Table
      className="CardTable"
      data={cards}
      loading={isLoading}
      emptyMessage="No cards found."
      onRowProps={(x) => ({
        type: "action",
        onClick: () =>
          Dialogs.open("primary", <GiftCardModal cardId={x._id} />),
      })}
      columns={[
        {
          heading: "Card",
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              size={12}
              color="white"
            >
              {x._id}
            </Span>
          ),
        },
        {
          heading: "User",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              size={12}
              color={x.used ? "orange" : "dark-gray"}
            >
              {x.used ? x.user.name : "Unused"}
            </Span>
          ),
        },
      ]}
    />
  );
};
