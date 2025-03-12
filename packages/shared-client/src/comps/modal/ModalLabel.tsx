import { FC } from "react";
import { StyledProps } from "../styled/Styled";
import { Div } from "../div/Div";

export type ModalLabelProps = Omit<StyledProps<"div">, "as">;

export const ModalLabel: FC<ModalLabelProps> = ({ children, ...forwardProps }) => {
  return (
    <Div
      fontSize={12}
      color="dark-sand"
      mb={8}
      {...forwardProps}
    >
      {children}
    </Div>
  );
};