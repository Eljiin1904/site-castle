import { SVGProps } from "react";

export const SvgPlusCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Zm1-9h3c.6 0 1 .4 1 1s-.4 1-1 1H9v3c0 .6-.4 1-1 1s-1-.4-1-1V9H4c-.6 0-1-.4-1-1s.4-1 1-1h3V4c0-.6.4-1 1-1s1 .4 1 1v3Z"
      clipRule="evenodd"
    />
  </svg>
);
