import { SVGProps } from "react";

export const SvgTimesCirlce = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Zm2.328-11.492a.823.823 0 1 1 1.164 1.164L9.164 8l2.328 2.328a.823.823 0 1 1-1.164 1.164L8 9.164l-2.328 2.328a.823.823 0 1 1-1.164-1.164L6.836 8 4.508 5.672a.823.823 0 0 1 1.164-1.164L8 6.836l2.328-2.328Z"
      clipRule="evenodd"
    />
  </svg>
);
