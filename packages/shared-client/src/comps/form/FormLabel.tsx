import { FC } from "react";
import { StyledProps } from "../styled/Styled";
import { Div } from "../div/Div";

export type FormLabelProps = Omit<StyledProps<"div">, "as"> & { color: Color };

export const FormLabel: FC<FormLabelProps> = ({ color, children, ...forwardProps }) => {
  return (
    <Div
      fontSize={12}
      color={color}
      mb={8}
      {...forwardProps}
    >
      {children}
    </Div>
  );
};
