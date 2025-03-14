import {
  CSSProperties,
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ReactNode,
  Ref,
  createElement,
} from "react";
import classNames from "classnames";

export type StyledProps<T extends ElementType = StyledElement> =
  ComponentPropsWithoutRef<T> & {
    as: T;
    forwardRef?: Ref<ElementRef<T>>;
    className?: string;
    position?: "static" | "relative" | "fixed" | "absolute" | "sticky";
    display?:
      | "inline"
      | "block"
      | "flex"
      | "inline-flex"
      | "inline-block"
      | "none"
      | "inherit";
    overflow?: "visible" | "auto" | "hidden";
    flexFlow?: "column" | "row" | "row-wrap";
    flexCenter?: boolean;
    alignItems?: "center" | "flex-start" | "flex-end" | "stretch";
    justifyContent?:
      | "center"
      | "flex-start"
      | "flex-end"
      | "space-between"
      | "space-around"
      | "stretch";
    flexBasis?: 0;
    flexGrow?: boolean | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    flexEven?: boolean;
    width?: "full" | Unit;
    height?: "full" | Unit;
    fx?: boolean;
    fy?: boolean;
    left?: Unit;
    right?: Unit;
    top?: Unit;
    bottom?: Unit;
    m?: Unit;
    mx?: Unit;
    my?: Unit;
    ml?: Unit;
    mr?: Unit;
    mt?: Unit;
    mb?: Unit;
    p?: Unit;
    px?: Unit;
    py?: Unit;
    pl?: Unit;
    pr?: Unit;
    pt?: Unit;
    pb?: Unit;
    gap?: Unit;
    color?: Color;
    bg?: Color;
    border?: boolean;
    borderLeft?: boolean;
    borderRight?: boolean;
    borderTop?: boolean;
    borderBottom?: boolean;
    borderWidth?: 0 | 1 | 2 | 3 | 4;
    borderRadius?: "full" | 2 | 4 | 8 | 12;
    borderColor?: Color;
    hover?: "highlight" | "darken" | "border" | "up" | "none" | "bg-darken";
    cursor?: "auto" | "pointer" | "grab" | "not-allowed";
    pointerEvents?: "auto" | "none" | "all";
    fontSize?: Unit;
    fontFamily?: "text" | "title";
    fontWeight?: "thin"| "light" | "regular" | "medium" | "semi-bold" | "bold";
    fontStyle?: "normal" | "italic" | "oblique";
    textDecoration?: "overline" | "line-through" | "underline";
    textTransform?: "uppercase" | "lowercase" | "capitalize";
    textAlign?: "center" | "left" | "right" | "justify";
    textOverflow?: "clip" | "ellipsis";
    zIndex?: 1 | 2 | 3 | 4 | 5;
    boxShadow?: 1 | 2 | 3 | 4;
    style?: CSSProperties | any;
    objectFitPosition?: "center" | "top" | "bottom" | "left" | "right" | "20%" | "40%" | "60%" | "80%";
  };

export type StyledElement = (props: {
  id?: string;
  className?: string;
  children?: any;
  style?: CSSProperties | any;
}) => null;

export type StyledLayoutProps = {
  id?: string;
  className?: string;
  position?: StyledProps["position"];
  display?: StyledProps["display"];
  flexBasis?: 0;
  flexGrow?: boolean | 1 | 2 | 3 | 4 | 5;
  width?: "full" | Unit;
  height?: "full" | Unit;
  fx?: boolean;
  fy?: boolean;
  left?: Unit;
  right?: Unit;
  top?: Unit;
  bottom?: Unit;
  m?: Unit;
  mx?: Unit;
  my?: Unit;
  ml?: Unit;
  mr?: Unit;
  mt?: Unit;
  mb?: Unit;
  gap?: Unit;
  hover?: StyledProps["hover"];
  style?: CSSProperties | any;
};

export function Styled<T extends ElementType>({
  as,
  forwardRef,
  className,
  children,
  position,
  display,
  overflow,
  flexFlow,
  flexCenter,
  alignItems = flexCenter ? "center" : undefined,
  justifyContent = flexCenter ? "center" : undefined,
  flexBasis,
  flexGrow,
  flexEven,
  fx,
  fy,
  width = fx ? "full" : undefined,
  height = fy ? "full" : undefined,
  left,
  right,
  top,
  bottom,
  m,
  mx,
  my,
  ml = mx || m,
  mr = mx || m,
  mt = my || m,
  mb = my || m,
  p,
  px,
  py,
  pl = px || p,
  pr = px || p,
  pt = py || p,
  pb = py || p,
  gap,
  color,
  bg,
  border,
  borderLeft,
  borderRight,
  borderTop,
  borderBottom,
  borderWidth,
  borderRadius,
  borderColor,
  hover,
  cursor,
  pointerEvents,
  fontSize,
  fontFamily,
  fontWeight,
  fontStyle,
  textDecoration,
  textTransform,
  textAlign,
  textOverflow,
  zIndex,
  boxShadow,
  ...forwardProps
}: StyledProps<T>) {
  return createElement(
    as,
    {
      ...forwardProps,
      ref: forwardRef,
      className: classNames(className, "_s", {
        [`_position-${position}`]: position,
        [`_display-${display}`]: display,
        [`_overflow-${overflow}`]: overflow,
        [`_flex-flow-${flexFlow}`]: flexFlow,
        [`_align-items-${alignItems}`]: alignItems,
        [`_justify-content-${justifyContent}`]: justifyContent,
        [`_flex-basis-${flexBasis}`]: flexBasis !== undefined,
        [`_flex-grow-${flexGrow}`]: flexGrow,
        ["_flex-even"]: flexEven,
        [`_h-${height}`]: height,
        [`_w-${width}`]: width,
        [`_left-${left}`]: left !== undefined,
        [`_right-${right}`]: right !== undefined,
        [`_top-${top}`]: top !== undefined,
        [`_bottom-${bottom}`]: bottom !== undefined,
        [`_ml-${ml}`]: ml,
        [`_mr-${mr}`]: mr,
        [`_mt-${mt}`]: mt,
        [`_mb-${mb}`]: mb,
        [`_pl-${pl}`]: pl,
        [`_pr-${pr}`]: pr,
        [`_pt-${pt}`]: pt,
        [`_pb-${pb}`]: pb,
        [`_gap-${gap}`]: gap,
        [`_color-${color}`]: color,
        [`_bg-${bg}`]: bg,
        ["_border-all"]: border,
        ["_border-left"]: borderLeft,
        ["_border-right"]: borderRight,
        ["_border-top"]: borderTop,
        ["_border-bottom"]: borderBottom,
        [`_border-width-${borderWidth}`]: borderWidth,
        [`_border-radius-${borderRadius}`]: borderRadius,
        [`_border-color-${borderColor}`]: borderColor,
        [`_hover-${hover}`]: hover,
        [`_cursor-${cursor}`]: cursor,
        [`_pointer-events-${pointerEvents}`]: pointerEvents,
        [`_font-size-${fontSize}`]: fontSize,
        [`_font-family-${fontFamily}`]: fontFamily,
        [`_font-weight-${fontWeight}`]: fontWeight,
        [`_text-decoration-${textDecoration}`]: textDecoration,
        [`_text-transform-${textTransform}`]: textTransform,
        [`_text-align-${textAlign}`]: textAlign,
        [`_text-overflow-${textOverflow}`]: textOverflow,
        [`_z-index-${zIndex}`]: zIndex,
        [`_box-shadow-${boxShadow}`]: boxShadow,
      }),
    },
    children as ReactNode,
  );
}