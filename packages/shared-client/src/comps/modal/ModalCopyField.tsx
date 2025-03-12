import { FC } from "react";
import { SvgCopy } from "#client/svgs/common/SvgCopy";
import { Toasts } from "#client/services/toasts";
import { ModalField, ModalFieldProps } from "./ModalField";
import { Vector } from "../vector/Vector";
import { Span } from "../span/Span";

export type ModalCopyFieldProps = Omit<ModalFieldProps, "children"> & {
  text: string | undefined;
};

export const ModalCopyField: FC<ModalCopyFieldProps> = ({
  text,
  ...forwardProps
}) => {
  return (
    <ModalField
      justify="space-between"
      {...forwardProps}
    >
      <Span textOverflow="ellipsis">{text}</Span>
      <Vector
        as={SvgCopy}
        size={14}
        ml={8}
        hover="highlight"
        onClick={() => {
          navigator.clipboard.writeText(`${text}`);
          Toasts.success("Copied to clipboard.");
        }}
      />
    </ModalField>
  );
};
