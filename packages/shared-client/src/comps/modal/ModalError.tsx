import { FC } from "react";
import { Errors } from "#client/services/errors";
import { Div } from "../div/Div";
import { Span } from "../span/Span";
import { Img } from "../img/Img";

export interface ModalErrorProps {
  error: Error;
}

export const ModalError: FC<ModalErrorProps> = ({ error }) => {
  return (
    <Div
      className="ModalError"
      fx
      fy
      column
      center
      py={32}
      bg="brown-8"
    >
      <Span size={18}>{"Error"}</Span>
      <Img
        type="png"
        path="/graphics/notice-chicken-error"
        width="256px"
      />
      <Span
        color="light-red"
        mt={24}
      >
        {Errors.getMessage(error)}
      </Span>
    </Div>
  );
};
