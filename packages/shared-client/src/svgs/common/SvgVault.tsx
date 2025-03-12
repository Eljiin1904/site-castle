import { SVGProps } from "react";

export const SvgVault = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 512 512"
    {...props}
  >
    <g fill="currentColor">
      <circle
        cx={256}
        cy={225.5}
        r={45}
      />
      <path d="M91 360.5h330v-270H91zm165-210a75 75 0 1 1-75 75 75.09 75.09 0 0 1 75-75z" />
      <path d="M497 0H15A15 15 0 0 0 0 15v421a15 15 0 0 0 15 15h46v46a15 15 0 0 0 15 15h70a15 15 0 0 0 15-15v-46h190v46a15 15 0 0 0 15 15h70a15 15 0 0 0 15-15v-46h46a15 15 0 0 0 15-15V15a15 15 0 0 0-15-15zm-46 375.5a15 15 0 0 1-15 15H76a15 15 0 0 1-15-15v-300a15 15 0 0 1 15-15h360a15 15 0 0 1 15 15z" />{" "}
    </g>
  </svg>
);
