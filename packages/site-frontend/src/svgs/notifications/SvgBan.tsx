import { SVGProps } from "react";

export const SvgBan = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M9 0H7V4H9V0ZM11 4H10V5H6V4H5V3L2 3V4H1L1 6V7H0V12V13V16H3V15H4V14H6V13H8H10V14H12V15H13V16H16V15V13V12V7H15V6V4H14V3L11 3V4ZM3 7H5V8H6V10H5V11H3V10H2V8H3V7ZM14 11H12V9H14V11ZM12 9H10V7H12V9Z"
      clipRule="evenodd"
    />
  </svg>
);