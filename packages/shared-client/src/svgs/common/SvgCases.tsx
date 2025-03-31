import { SVGProps } from "react";

export const SvgCases = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
   <path fillRule="evenodd" clipRule="evenodd" d="M1 0H15V2H16V4H0V2H1V0ZM16 5H0V14H1V15H2V16H14V15H15V14H16V5ZM9 7V6H7V7H6V9H7V10V11H6V12H7H9H10V11H9V10V9H10V7H9Z" fill="currentColor"/> 
  </svg>
);
