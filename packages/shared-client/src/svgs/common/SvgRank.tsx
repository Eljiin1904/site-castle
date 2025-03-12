import { SVGProps } from "react";

export const SvgRank = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 512 512"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M466.789 512V368.441L256 214.135 45.211 368.441V512L256 357.694zm0-214.135L256 143.559 45.211 297.865V154.306L256 0l210.789 154.306z"
    />
  </svg>
);
