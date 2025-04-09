import { SVGProps } from "react";

export const SvgBug = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M10 0H11H12H13H14V1H13V2H12V3H13V4H14V3H15V2H16V3V4V5V6H15V7H14H13H12H11V8H10V9H9V10H8V11H7V13H6V14H5V15H4V16H3V15H2V14H1V13H0V12H1V11H2V10H3V9H5V8H6V7H7V6H8V5H9V4V3V2V1H10V0Z"
      clipRule="evenodd"
    />
  </svg>
);
