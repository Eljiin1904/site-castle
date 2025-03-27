import { SVGProps } from "react";

export const SvgChest = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      d="M14 7H2V14C2 14.6 2.4 15 3 15H13C13.6 15 14 14.6 14 14V7Z"
      fill="currentColor"
    />
    <path
      d="M16 1H0V5H16V1Z"
      fill="currentColor"
    />
  </svg>
);
