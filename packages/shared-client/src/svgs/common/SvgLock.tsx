import { SVGProps } from "react";

export const SvgLock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M10 6h2V4a4 4 0 1 0-8 0v2h2V4a2 2 0 1 1 4 0v2ZM1.293 7.293A1 1 0 0 1 2 7h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V8a1 1 0 0 1 .293-.707Zm5.874 5.454a1.5 1.5 0 1 0 1.666-2.495 1.5 1.5 0 0 0-1.666 2.495Z"
      clipRule="evenodd"
    />
  </svg>
);
