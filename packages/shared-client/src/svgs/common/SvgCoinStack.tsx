import { SVGProps } from "react";

export const SvgCoinStack = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 16 16"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 6c2.9 0 6-.9 6-3s-3.1-3-6-3-6 .9-6 3 3.1 3 6 3Zm-6 .5V8c0 2.1 3.1 3 6 3s6-.9 6-3V6.5C12.6 7.4 10.5 8 8 8s-4.6-.6-6-1.5ZM2 13v-1.5c1.4.9 3.5 1.5 6 1.5s4.6-.5 6-1.5V13c0 2.1-3.1 3-6 3s-6-.9-6-3Z"
      clipRule="evenodd"
    />
  </svg>
);
