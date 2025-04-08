import { SVGProps } from "react";

export const SvgDiamond = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M3 0H13V1H14V2H15V3H16V4V5V6H15V7H14.5V8H14V9H13V10H12.5V11H12V12H11V13H10.5V14H10V15H9V16H7V15H6V14H5.5V13H5V12H4V11H3.5V10H3V9H2V8H1.5V7H1V6H0V5H3.5V6H4V7H4.5V8H5.5V7H5V6H4.5V5H13.5V4H4.5V3H5.5V2H6.5V1H5.5V2H4.5V3H3.5V4H0V3H1V2H2V1H3V0Z"
      clipRule="evenodd"
    />
  </svg>
);