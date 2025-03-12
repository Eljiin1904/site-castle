import { SVGProps } from "react";

export const SvgArrowBottom = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <g fill="currentColor">
      <path d="M8 13.474a.842.842 0 0 1-.598-.245L2.636 8.463a.842.842 0 1 1 1.196-1.187l4.21 4.168 4.168-4.168a.842.842 0 1 1 1.188 1.187L8.64 13.23a.842.842 0 0 1-.64.244Z" />
      <path d="M8 13.474a.842.842 0 0 1-.842-.842V.842a.842.842 0 0 1 1.684 0v11.79a.842.842 0 0 1-.842.842ZM13.053 16H2.947a.842.842 0 1 1 0-1.684h10.106a.842.842 0 1 1 0 1.684Z" />
    </g>
  </svg>
);
