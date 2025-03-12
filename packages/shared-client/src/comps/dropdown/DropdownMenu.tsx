import { FC, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { Div } from "../div/Div";
import { StyledProps } from "../styled/Styled";
import "./DropdownMenu.scss";

export type DropdownMenuProps = {
  width?: string;
  clampHeight?: boolean;
  forceAlign?: MenuAlign;
  forceDirection?: MenuDirection;
  overflow?: StyledProps["overflow"];
  children: any;
};

export type MenuAlign = "left" | "right" | "center";

export type MenuDirection = "top" | "bottom";

export const DropdownMenu: FC<DropdownMenuProps> = ({
  width,
  clampHeight,
  forceAlign,
  forceDirection,
  overflow = "auto",
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [align, setAlign] = useState<MenuAlign>();
  const [autoDirection, setAutoDirection] = useState<MenuDirection>();

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const offsetRight = window.innerWidth - rect.right;
      const offsetBottom = window.innerHeight - rect.bottom;
      if (forceAlign) {
        setAlign(forceAlign);
      } else {
        setAlign(offsetRight > 200 ? "left" : "right");
      }
      setAutoDirection(
        offsetBottom > window.innerHeight / 3 ? "bottom" : "top",
      );
    }
  }, [ref]);

  const dir = forceDirection || autoDirection;
  const hide = !align || !dir;

  return (
    <Div
      className={classNames("DropdownMenu", {
        [`align-${align}`]: align,
        [`direction-${dir}`]: dir,
        "clamp-height": clampHeight,
      })}
      forwardRef={ref}
      position="absolute"
      fx
      fy
    >
      <Div
        className="menu-outer"
        display={hide ? "none" : "flex"}
        position="absolute"
        py={8}
        style={width ? { width } : undefined}
      >
        <Div
          className="menu-inner"
          fx
          overflow={overflow}
          boxShadow={2}
        >
          {children}
        </Div>
      </Div>
    </Div>
  );
};
