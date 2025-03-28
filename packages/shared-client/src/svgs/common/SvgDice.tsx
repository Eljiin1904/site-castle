import { SVGProps } from "react";

export const SvgDice = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fillRule="evenodd" clipRule="evenodd"
      d="M14 0V1H15V2H16V14H15V15H14V16H2V15H1V14H0V2H1V1H2V0H14ZM3 3H6V6H3V3ZM3 10H6V13H3V10ZM13 3H10V6H13V3ZM10 10H13V13H10V10Z"
      fill="currentColor"
    />
  </svg>
);