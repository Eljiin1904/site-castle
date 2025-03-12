import { useRef, FC, MouseEventHandler } from "react";
import { useEventListener } from "usehooks-ts";
import classNames from "classnames";
import { Div } from "../div/Div";
import { Span } from "../span/Span";
import { StyledLayoutProps, StyledProps } from "../styled/Styled";
import { DropdownMenu, DropdownMenuProps } from "./DropdownMenu";
import "./DropdownBase.scss";

export type DropdownBaseProps = StyledLayoutProps & {
  button: JSX.Element;
  menuWidth?: string;
  menuOverflow?: StyledProps["overflow"];
  clampHeight?: boolean;
  forceAlign?: DropdownMenuProps["forceAlign"];
  forceDirection?: DropdownMenuProps["forceDirection"];
  body: JSX.Element;
  open: boolean;
  disabled?: boolean;
  error?: string;
  onToggle: (x: boolean) => void;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
};

export const DropdownBase: FC<DropdownBaseProps> = ({
  className,
  button,
  menuWidth,
  menuOverflow,
  clampHeight,
  forceAlign,
  forceDirection,
  body,
  open,
  disabled,
  error,
  onToggle,
  ...forwardProps
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEventListener("mousedown", (e) => {
    if (open && !ref.current?.contains(e.target as Element)) {
      onToggle(false);
    }
  });

  return (
    <Div
      className={classNames("Dropdown", className, {
        disabled,
        error: error !== undefined,
      })}
      forwardRef={ref}
      {...forwardProps}
    >
      <Div
        className="dropdown-button-ctn"
        fx
        onClick={disabled ? undefined : () => onToggle(!open)}
      >
        {button}
      </Div>
      {open && (
        <DropdownMenu
          width={menuWidth}
          clampHeight={clampHeight}
          forceAlign={forceAlign}
          forceDirection={forceDirection}
          overflow={menuOverflow}
        >
          {body}
        </DropdownMenu>
      )}
      {error && (
        <Span
          className="error-text"
          fontSize={12}
        >
          {error}
        </Span>
      )}
    </Div>
  );
};
