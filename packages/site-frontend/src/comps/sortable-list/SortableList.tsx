import { ReactNode } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";

interface SortableListProps<T extends { _id: string }> {
  items: T[];
  disabled?: boolean;
  onDragEnd: (event: DragEndEvent) => void;
  renderItem: (item: T) => ReactNode;
}

export const SortableList = <T extends { _id: string }>({
  items,
  disabled,
  onDragEnd,
  renderItem,
}: SortableListProps<T>) => {
  const uniqueIds = items.map((item) => item._id);

  return (
    <DndContext onDragEnd={onDragEnd}>
      <SortableContext items={uniqueIds}>
        {items.map((item) => (
          <SortableItem
            key={item._id}
            id={item._id}
            disabled={disabled}
            item={item}
            renderItem={renderItem}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};
