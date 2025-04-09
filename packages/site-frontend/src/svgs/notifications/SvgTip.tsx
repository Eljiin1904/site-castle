import { SVGProps } from "react";

export const SvgTip = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M5 0H4H3H2V1H1V2V3H2V4H1V5H0V7H16V5H15V4H14V3H15V2V1H14V0H13H12H11V1H10V2H9V3H8H7V2H6V1H5V0ZM13 2V3H12V4H10V3H11V2H12H13ZM6 3V4H4V3H3V2H4H5V3H6ZM2 8H1V15H2V16H14V15H15V8H14H2Z"
      clipRule="evenodd"
    />
  </svg>
);
