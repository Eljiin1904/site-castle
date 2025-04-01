import { SVGProps } from "react";

export const SvgPromotions = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M15 0H14V1H12V2H10V3H8V4H6V5H4V6H2H0V10H2V15H3V16H8V15H9V13H10V14H12V15H14V16H15V15H16V1H15V0ZM7 14V12H6V11H4V14H7Z"
      clipRule="evenodd"
    />
  </svg>
);