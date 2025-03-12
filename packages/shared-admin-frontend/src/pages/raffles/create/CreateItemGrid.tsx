import { LootItem } from "@core/types/items/BasicItem";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { CreateItemCard } from "./CreateItemCard";

export const CreateItemGrid = ({
  items,
  onItemClick,
}: {
  items: LootItem[];
  onItemClick: (x: LootItem) => void;
}) => {
  return (
    <Div
      fx
      fy
      align="flex-start"
      p={16}
      border
      bg="brown-8"
    >
      {items.length === 0 ? (
        <Div
          fx
          fy
          center
        >
          <Span size={16}>{"Add items to raffle below"}</Span>
        </Div>
      ) : (
        <Div
          grow
          flow="row-wrap"
          gap={12}
        >
          {items.map((x) => (
            <CreateItemCard
              key={x.id}
              item={x}
              onClick={() => onItemClick(x)}
            />
          ))}
        </Div>
      )}
    </Div>
  );
};
