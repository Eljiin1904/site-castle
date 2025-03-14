import { FC } from "react";
import { InputBase, InputBaseProps } from "./InputBase";
import { SvgCopyKeyboard } from "#client/svgs/common/SvgCopyKeyboard";


export type KeyboardInputProps = Omit<InputBaseProps, "type"  | "onChange" | "placeholder"> & {
  value: string;
  onClick?: () => void;
};

export const KeyboardInput: FC<KeyboardInputProps> = ({ ...forwardProps }) => {
  
  return (
      <InputBase
        type={"text"}
        iconRight={SvgCopyKeyboard}
        iconColor="dark-sand"
        onIconRightClick={forwardProps.onClick}
        placeholder=""
        onChange={() => {}}
        className="overlay-background"
        {...forwardProps}
      />
    );
};
