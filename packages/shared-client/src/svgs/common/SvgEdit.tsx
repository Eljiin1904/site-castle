import { SVGProps } from "react";

export const SvgEdit = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="m12.975.439 2.586 2.586a1.5 1.5 0 0 1 0 2.121l-1.177 1.177-4.707-4.707L10.854.439a1.5 1.5 0 0 1 2.121 0ZM1.646 9.646l6.97-6.969 4.707 4.707-6.969 6.97a.5.5 0 0 1-.222.128l-5.5 1.5a.5.5 0 0 1-.614-.614l1.5-5.5a.5.5 0 0 1 .128-.222Z"
      clipRule="evenodd"
    />
  </svg>
);
