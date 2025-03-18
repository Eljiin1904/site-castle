import { SVGProps } from "react";

export const SvgDouble = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 0H9V1V12H11V14H10V15H9V16H8H7V15H6V14H5V12H7V9H1V8H0V7H1H7V1H8V0ZM11 7H12H15V8H16V9H15H13H12H11V7Z"
      clipRule="evenodd"
    />
  </svg>
);