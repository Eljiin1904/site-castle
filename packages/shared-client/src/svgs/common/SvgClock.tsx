import { SVGProps } from "react";

export const SvgClock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      d="M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8Zm4.667 8.667H8A.666.666 0 0 1 7.333 8V3.333a.666.666 0 1 1 1.334 0v4h4a.666.666 0 1 1 0 1.334Z"
    />
  </svg>
);
