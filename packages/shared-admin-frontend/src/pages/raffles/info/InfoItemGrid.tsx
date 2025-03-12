import { LootItem } from "@core/types/items/BasicItem";
import { Div } from "@client/comps/div/Div";
import { InfoItemCard } from "./InfoItemCard";

export const InfoItemGrid = ({ items }: { items: LootItem[] }) => {
  return (
    <Div
      fx
      fy
      align="flex-start"
      p={16}
      border
      bg="brown-8"
    >
      <Div
        grow
        flow="row-wrap"
        gap={12}
      >
        {items.map((x) => (
          <InfoItemCard
            key={x.id}
            item={x}
          />
        ))}
      </Div>
    </Div>
  );
};
