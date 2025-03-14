import { FC } from "react";
import { BoxProps, Box } from "../box/Box";
import { Styled } from "../styled/Styled";

export type OrderedListProps = Omit<BoxProps<"ol">, "as" | "children"> & {
  type?: "a" | "i" | "1" | "A" | "I";
  items: string[];
  itemSize?: Unit;
};

export const OrderedList: FC<OrderedListProps> = ({
  type,
  itemSize = 14,
  items,
  ...forwardProps
}) => {
  return (
    <Box
      as="ol"
      type={type}
      column
      gap={20}
      {...forwardProps}
    >
      {items.map((x, i) => (
        <Styled
          key={i}
          as="li"
          fontSize={itemSize}
          color="dark-sand"
          fontWeight="medium"
          pl={12}
        >
          {x}
        </Styled>
      ))}
    </Box>
  );
};
