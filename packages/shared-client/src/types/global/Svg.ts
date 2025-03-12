import type { SVGProps } from "react";

declare global {
  type Svg = (props: SVGProps<SVGSVGElement>) => JSX.Element;
}

export {};
