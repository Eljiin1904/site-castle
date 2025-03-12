import { SVGProps } from "react";

export const SvgStar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      d="M15.5 5.49h-5.4L8.477.314a.52.52 0 0 0-.954 0L5.9 5.49H.5a.5.5 0 0 0-.3.9l4.3 3.23-1.693 5.207a.5.5 0 0 0 .769.558L8 12.172l4.424 3.214a.5.5 0 0 0 .769-.558L11.5 9.62l4.3-3.23a.5.5 0 0 0-.3-.9Z"
    />
  </svg>
);
