import { SVGProps } from "react";

export const SvgEllipsisV = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm2 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0Zm0 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"
      clipRule="evenodd"
    />
  </svg>
);
