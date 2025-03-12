import { SVGProps } from "react";

export const SvgCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      d="m15.854 3.146-1.5-1.5a.5.5 0 0 0-.707 0L5.5 9.793 2.354 6.647a.5.5 0 0 0-.707 0L.146 8.146a.5.5 0 0 0 0 .707l5 5a.498.498 0 0 0 .708 0l10-9.999a.5.5 0 0 0 0-.707v-.001Z"
    />
  </svg>
);
