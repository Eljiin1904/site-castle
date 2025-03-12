import { SVGProps } from "react";

export const SvgWallet = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 32 32"
    {...props}
  >
    <g fill="currentColor">
      <path d="M30 24v2.5c0 1.379-1.122 2.5-2.5 2.5H6c-2.206 0-4-1.794-4-4V8c0-2.206 1.794-4 4-4h18.5a1.5 1.5 0 1 1 0 3H6a1.001 1.001 0 0 0 0 2h21.5c1.378 0 2.5 1.121 2.5 2.5V14h-5c-2.757 0-5 2.243-5 5s2.243 5 5 5z" />
      <path d="M30 16v6h-5a3 3 0 1 1 0-6z" />
    </g>
  </svg>
);
