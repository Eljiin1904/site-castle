import { SVGProps } from "react";

export const SvgSiteRank = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 35 16"
    fill="none"
    {...props}
  >
    <path
      className="background"
      fill="#3A424B"
      d="M4.87 0H34.5l-2.37 16H2.5L4.87 0Z"
    />
    <path
      className="stripes"
      fill="#B8C7D7"
      d="M4.1 16H2.5L4.9 0h1.6L4.1 16ZM1.5 16H0L2.5 0H4L1.5 16Z"
    />
  </svg>
);
