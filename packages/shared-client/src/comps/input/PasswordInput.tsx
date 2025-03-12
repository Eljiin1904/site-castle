import { FC, useState } from "react";
import { SvgEye } from "#client/svgs/common/SvgEye";
import { SvgEyeOut } from "#client/svgs/common/SvgEyeOut";
import { InputBase, InputBaseProps } from "./InputBase";

export type PasswordInputProps = Omit<InputBaseProps, "type">;

export const PasswordInput: FC<PasswordInputProps> = ({ ...forwardProps }) => {
  const [reveal, setReveal] = useState(false);
  return (
    <InputBase
      type={reveal ? "text" : "password"}
      iconRight={reveal ? SvgEyeOut : SvgEye}
      onIconRightClick={() => setReveal((x) => !x)}
      {...forwardProps}
    />
  );
};
