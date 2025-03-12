import { SVGProps } from "react";

export const SvgMinusCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16ZM3 8c0-.6.4-1 1-1h8c.6 0 1 .4 1 1s-.4 1-1 1H4c-.6 0-1-.4-1-1Z"
      clipRule="evenodd"
    />
  </svg>
);
