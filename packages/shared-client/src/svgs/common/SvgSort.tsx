import { SVGProps } from "react";

export const SvgSort = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1 3h14a1 1 0 0 0 0-2H1a1 1 0 0 0 0 2Zm12 4H3a1 1 0 0 1 0-2h10a1 1 0 0 1 0 2Zm-8 4h6a1 1 0 0 0 0-2H5a1 1 0 0 0 0 2Zm2 4h2a1 1 0 0 0 0-2H7a1 1 0 0 0 0 2Z"
      clipRule="evenodd"
    />
  </svg>
);
