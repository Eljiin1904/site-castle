import { ElementType } from "react";
import { Styled, StyledProps } from "../styled/Styled";

export type DividerProps<T extends ElementType> = StyledProps<T> & {
  center?: StyledProps["flexCenter"];
  align?: StyledProps["alignItems"];
  justify?: StyledProps["justifyContent"];
  grow?: StyledProps["flexGrow"];
  flow?: StyledProps["flexFlow"];
  column?: boolean;
  wrap?: boolean;
  even?: boolean;
};

export function Divider<T extends ElementType>({
  center,
  align,
  justify,
  grow,
  column,
  wrap,
  even,
  flow,
  ...forwardProps
}: DividerProps<T>) {
  return (
    <Styled
      display="flex"
      border={false}
      borderTop={true}
      flexCenter={center}
      alignItems={align}
      justifyContent={justify}
      flexGrow={grow}
      flexFlow={column ? "column" : wrap ? "row-wrap" : flow}
      flexEven={even}
      {...(forwardProps as StyledProps<T>)}
    />
  );
}
