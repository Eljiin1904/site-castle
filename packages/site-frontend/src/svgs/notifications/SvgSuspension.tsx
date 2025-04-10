import { SVGProps } from "react";

export const SvgSuspension = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M11 0H5V1H3V2H2V3H1V5H0V7V9V11H1V13H2V14H3V15H5V16H11V15H13V14H14V13H15V11H16V9V7V5H15V3H14V2H13V1H11V0ZM7 2H8V3H9V7H13V8V9H9H8V8H7V2Z"
      clipRule="evenodd"
    />
  </svg>
);
