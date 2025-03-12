import { SVGProps } from "react";

export const SvgCopy = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1 12h10a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1Zm3 4h11a1 1 0 0 0 1-1V4h-2v10H4v2Z"
      clipRule="evenodd"
    />
  </svg>
);
