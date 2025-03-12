import { SVGProps } from "react";

export const SvgDOGE = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <circle
      cx={10}
      cy={10}
      r={8}
      fill="#fff"
    />
    <path
      fill="#C2A633"
      d="M10.24 6.59H8.811v2.817h2.248v1.18H8.811v2.816h1.499c.385 0 3.162.043 3.157-3.277-.004-3.32-2.693-3.536-3.227-3.536Z"
    />
    <path
      fill="#C2A633"
      d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0Zm.393 15.401H6.77v-4.815H5.495V9.407H6.77V4.592H9.88c.735 0 5.605-.153 5.605 5.495 0 5.74-5.092 5.314-5.092 5.314Z"
    />
  </svg>
);
