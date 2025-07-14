import { FC } from "react";
import classNames from "classnames";
import { Styled, StyledProps } from "../styled/Styled";
import "./Heading.scss";

export type HeadingProps = Omit<StyledProps, "as"> & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5";
  family?: StyledProps["fontFamily"];
  fontWeight?: StyledProps["fontWeight"];
  size?: Unit;
  children: any;
};

export const Heading: FC<HeadingProps> = ({
  as = "h3",
  className,
  size = 16,
  fontSize = size,
  family,
  fontFamily = family,
  fontWeight = "bold",
  children,
  ...forwardProps
}) => {
  return (
    <Styled
      as={as}
      className={classNames("Heading", className)}
      fontSize={fontSize}
      fontFamily={fontFamily}
      fontWeight={fontWeight}
      {...forwardProps}
    >
      {children}
    </Styled>
  );
};
