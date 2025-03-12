import { SVGProps } from "react";

export const SvgTRX = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <circle
      cx={10}
      cy={10}
      r={9}
      fill="#fff"
    />
    <path
      fill="#000"
      d="m8.864 15.41.654-5.22L5.6 6.919l3.264 8.491ZM12.636 6.718l-6.663-.663 4 3.336 2.663-2.673ZM9.718 15.873l5.473-6.155-4.782.691-.69 5.464Z"
    />
    <path
      fill="#000"
      d="M10 0C4.473 0 0 4.473 0 10s4.473 10 10 10 10-4.473 10-10S15.527 0 10 0ZM8.936 18.136 3.855 4.927l9.99 1 3.146 3.146-8.055 9.063Z"
    />
    <path
      fill="#000"
      d="m11.282 9.355 4.118-.582-1.764-1.764-2.354 2.346Z"
    />
  </svg>
);
