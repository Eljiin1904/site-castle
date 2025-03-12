import { SVGProps } from "react";

export const SvgRain = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M0 4.7C0 3.3 2.2 1 2.2 1s2.2 2.3 2.2 3.7C4.5 6.2 3.3 7 2.2 7S0 6.2 0 4.7Zm4 6.5C4 8.9 8 5 8 5s4 3.9 4 6.2c0 2.4-2.1 3.8-4 3.8s-4-1.4-4-3.8ZM13.8 1S16 3.3 16 4.7C16 6.2 14.8 7 13.8 7c-1 0-2.2-.8-2.2-2.3 0-1.4 2.2-3.7 2.2-3.7Z"
      clipRule="evenodd"
    />
  </svg>
);
