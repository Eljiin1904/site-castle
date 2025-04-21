import { SVGProps } from "react";

export const SvgCalendar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M3 0H4H5V3H11V0H12H13V3H15V4H16V15H15V16H1V15H0V4H1V3H3V0ZM14 7H2V14H14V7Z"
      clipRule="evenodd"
    />
  </svg>
);