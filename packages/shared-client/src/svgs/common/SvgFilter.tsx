import { SVGProps } from "react";

export const SvgFilter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      d="M16 3c0-2.916-7.181-3-8-3S0 .084 0 3c0 .457.191.837.492 1.166L6 10.37V15a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4.63l5.47-6.163C15.794 3.87 16 3.476 16 3ZM8 2c3.137 0 5.155.584 5.829 1-.674.416-2.692 1-5.829 1-3.137 0-5.155-.584-5.829-1C2.845 2.584 4.863 2 8 2Z"
    />
  </svg>
);
