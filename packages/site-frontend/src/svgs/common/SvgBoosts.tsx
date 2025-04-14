import { SVGProps } from "react";

export const SvgBoost = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1 0H3H13H15V2H16V4V5H15V6V7H14V8H13H12V9H11V10H10V11H9V13H10V14H11V15H12V16H4V15H5V14H6V13H7V11H6V10H5V9H4V8H3H2V7H1V6V5H0V4V2H1V0ZM14 5V6H13V2H14V4V5ZM2 2H3V6H2V5V4V2Z"
      clipRule="evenodd"
    />
  </svg>
);