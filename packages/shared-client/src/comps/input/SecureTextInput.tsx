import { FC, useState } from "react";
import { SvgEye } from "#client/svgs/common/SvgEye";
import { SvgEyeOut } from "#client/svgs/common/SvgEyeOut";
import { InputBase, InputBaseProps } from "./InputBase";

export type SecureTextInputProps = Omit<InputBaseProps, "type">;

export const SecureTextInput: FC<SecureTextInputProps> = ({ ...forwardProps }) => {
  const [reveal, setReveal] = useState(false);
  return (
    <InputBase
      type={reveal ? "text" : "password"}
      iconRight={reveal ? SvgEyeOut : SvgEye}
      iconColor="dark-sand"
      onIconRightClick={() => setReveal((x) => !x)}
      {...forwardProps}
    />
  );
};
