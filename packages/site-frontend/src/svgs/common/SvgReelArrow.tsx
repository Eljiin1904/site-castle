import { SVGProps } from "react";

export const SvgReelArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 5 10"
    fill="none"
    {...props}
  >
    <linearGradient id="SvgReelArrow-lg">
      <stop
        offset={0}
        stopColor="var(--light-yellow-color)"
      />
      <stop
        offset={1}
        stopColor="var(--yellow-color)"
      />
    </linearGradient>
    <path
      d="M5 5L1.31174e-07 10L0 5.46244e-08L5 5Z"
      fill="url(#SvgReelArrow-lg)"
      stroke="var(--brown-7-color)"
      strokeWidth="1"
    />
  </svg>
);
