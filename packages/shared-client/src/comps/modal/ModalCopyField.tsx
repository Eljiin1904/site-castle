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
  const {size, ...spanProps} = forwardProps;
  const fontSize =  size === "lg" ? 14 : 12;
  const lineHeight = size === "lg" ? 20 : 16;
  return (
    <ModalField
      justify="space-between"
      size={size}
    >
      <Span textOverflow="ellipsis" fontSize={fontSize} lineHeight={lineHeight} {...spanProps}>{text}</Span>
      <Vector
        as={SvgCopy}
        size={14}
        ml={8}
        hover="highlight"
        onClick={() => {
          navigator.clipboard.writeText(`${text}`);
          Toasts.success("copyToClipboard");
        }}
      />
    </ModalField>
  );
};
