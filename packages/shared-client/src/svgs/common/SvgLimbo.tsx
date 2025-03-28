import { SVGProps } from "react";

export const SvgLimbo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path fill-rule="evenodd" clip-rule="evenodd" d="M14 0H13V1H12H10V2H9H7V3H6V4H4H2H1V5H0V8H1V9H3V11H4V12H5V13H7V15H8V16H11V15H12V14V12V10H13V9H14V7V6H15V4V3H16V2V0H14ZM3 12V13H4V15H2V16H0V14H1V12H3ZM9 5V4H11V5H12V7H11V8H9V7H8V5H9Z" fill="currentColor"/>
  </svg>
);