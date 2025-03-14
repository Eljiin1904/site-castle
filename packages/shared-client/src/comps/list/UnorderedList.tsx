import { FC } from "react";
import { BoxProps, Box } from "../box/Box";
import { Styled } from "../styled/Styled";

export type UnorderedListProps = Omit<BoxProps<"ul">, "as" | "children"> & {
  items: string[];
  itemSize?: Unit;
};

export const UnorderedList: FC<UnorderedListProps> = ({
  itemSize = 14,
  items,
  ...forwardProps
}) => {
  return (
    <Box
      as="ul"
      column
      gap={12}
      {...forwardProps}
    >
      {items.map((x, i) => (
        <Styled
          key={i}
          as="li"
          fontSize={itemSize}
          color={forwardProps.color || "dark-sand"}
        >
          {x}
        </Styled>
      ))}
    </Box>
  );
};
