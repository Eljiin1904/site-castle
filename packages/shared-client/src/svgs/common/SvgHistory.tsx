import { SVGProps } from "react";

export const SvgHistory = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M2 14h4.882c.298.759.76 1.442 1.355 2H1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2V1a1 1 0 0 1 2 0v2h6V1a1 1 0 0 1 2 0v2h2a1 1 0 0 1 1 1v4.237a5.508 5.508 0 0 0-2-1.355V6H2v8Zm7.778-5.326a4 4 0 1 1 4.444 6.652 4 4 0 0 1-4.444-6.652ZM12 12.75h2a.75.75 0 1 0 0-1.5h-1.25V10a.75.75 0 1 0-1.5 0v2a.75.75 0 0 0 .75.75Z"
      clipRule="evenodd"
    />
  </svg>
);
