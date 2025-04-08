import { SVGProps } from "react";

export const SvgBomb = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M16 0H15V1H14V0H13V1H14V2H13V3H12V4H13V3H14V2H15V3H16V2H15V1H16V0ZM7 4V5H8V6H9V5H10V4H11V5H12V6H11V7H10V8H11V9H12V11H11V13H10V14H9V15H7V16H5V15H3V14H2V13H1V11H0V9H1V7H2V6H3V5H5V4H7Z"
      clipRule="evenodd"
    />
  </svg>
);
//fill="#FB4545"