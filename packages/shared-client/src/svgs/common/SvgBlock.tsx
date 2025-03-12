import { SVGProps } from "react";

export const SvgBlock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <circle
      cx="8"
      cy="8"
      r="7"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="3"
      y1="13"
      x2="13"
      y2="3"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
