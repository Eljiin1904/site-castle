import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps<T extends { _id: string }> {
  id: string;
  item: T;
  disabled?: boolean;
  renderItem: (item: T) => React.ReactNode;
}

export const SortableItem = <T extends { _id: string }>({
  id,
  item,
  disabled,
  renderItem,
}: SortableItemProps<T>) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {renderItem(item)}
    </div>
  );
};
