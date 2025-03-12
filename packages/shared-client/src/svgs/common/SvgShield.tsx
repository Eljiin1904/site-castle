import { SVGProps } from "react";

export const SvgShield = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      d="M15 3C13.25 3 10.455 1.592 8.6.2a.996.996 0 0 0-1.2 0C5.545 1.592 2.75 3 1 3a1 1 0 0 0-1 1c0 5.584 2.701 9.817 7.606 11.919a1 1 0 0 0 .788 0C13.299 13.817 16 9.584 16 4a1 1 0 0 0-1-1ZM8 13.904V8H2.616a12.037 12.037 0 0 1-.589-3.093C3.955 4.582 6.236 3.445 8 2.23V8h5.384c-.878 2.634-2.69 4.643-5.384 5.904Z"
    />
  </svg>
);
