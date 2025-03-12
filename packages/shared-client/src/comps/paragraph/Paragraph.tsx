import { FC } from "react";
import classNames from "classnames";
import { StyledProps, Styled } from "../styled/Styled";
import "./Paragraph.scss";

export type ParagraphProps = Omit<StyledProps<"p">, "as"> & {
  size?: Unit;
  family?: StyledProps["fontFamily"];
  children: any;
};

export const Paragraph: FC<ParagraphProps> = ({
  className,
  size,
  fontSize = size,
  family,
  fontFamily = family,
  children,
  ...forwardProps
}) => {
  return (
    <Styled
      as="p"
      className={classNames("Paragraph", className)}
      fontSize={fontSize}
      fontFamily={fontFamily}
      {...forwardProps}
    >
      {children}
    </Styled>
  );
};
