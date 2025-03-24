import { FC } from "react";
import classNames from "classnames";
import { StyledProps, Styled } from "../styled/Styled";
import "./Span.scss";

export type SpanProps = Omit<StyledProps<"span">, "as"> & {
  size?: Unit;
  family?: StyledProps["fontFamily"];
  weight?: StyledProps["fontWeight"];
  lineHeight?: Unit;
  children: any;
};

export const Span: FC<SpanProps> = ({
  className,
  children,
  size,
  fontSize = size,
  family,
  fontFamily = family,
  weight,
  fontWeight = weight,
  lineHeight,
  ...forwardProps
}) => {
  return (
    <Styled
      as="span"
      className={classNames("Span", className)}
      fontSize={fontSize}
      fontFamily={fontFamily}
      fontWeight={fontWeight}
      lineHeight={lineHeight}
      {...forwardProps}
    >
      {children}
    </Styled>
  );
};
