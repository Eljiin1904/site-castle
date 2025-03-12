import { FC } from "react";
import classNames from "classnames";
import { SvgCircle } from "#client/svgs/common/SvgCircle";
import { Div } from "../div/Div";
import { StyledLayoutProps } from "../styled/Styled";
import { Vector } from "../vector/Vector";
import "./Toggle.scss";

export type ToggleProps = StyledLayoutProps & {
  value: boolean | undefined;
  disabled?: boolean;
  children?: any;
  onChange: (v: boolean) => void;
};

export const Toggle: FC<ToggleProps> = ({
  className,
  value,
  children,
  disabled,
  onChange,
  ...forwardProps
}) => {
  return (
    <Div
      className={classNames("Toggle", className, { active: value, disabled })}
      onClick={disabled ? undefined : () => onChange(!value)}
      {...forwardProps}
    >
      <Vector
        className="knob"
        position="absolute"
        top={3}
        left={value ? undefined : 3}
        right={value ? 3 : undefined}
        as={SvgCircle}
        size={24}
      />
      {children}
    </Div>
  );
};
