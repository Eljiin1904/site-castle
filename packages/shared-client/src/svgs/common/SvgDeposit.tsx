import { SVGProps } from "react";

export const SvgDeposit = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M6 2H2v4H0V2a2 2 0 0 1 2-2h4v2Zm-4 8H0v4a2 2 0 0 0 2 2h4v-2H2v-4Zm12 4h-4v2h4a2 2 0 0 0 2-2v-4h-2v4Zm0-14h-4v2h4v4h2V2a2 2 0 0 0-2-2Zm-2.23 8.08a.5.5 0 0 1 .106.749l-3.5 4a.5.5 0 0 1-.752 0l-3.5-4A.5.5 0 0 1 4.5 8H7V4a1 1 0 1 1 2 0v4h2.5a.5.5 0 0 1 .27.08Z"
      clipRule="evenodd"
    />
  </svg>
);
