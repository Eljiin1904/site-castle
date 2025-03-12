import { SVGProps } from "react";

export const SvgDiamond = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      d="M12.512.907A.666.666 0 0 0 12 .667H4a.666.666 0 0 0-.512.24l-3.333 4a.667.667 0 0 0-.026.82l7.333 10a.668.668 0 0 0 1.076 0l7.333-10a.666.666 0 0 0-.026-.82l-3.333-4ZM12.667 6H3.333V4.667h9.334V6Z"
    />
  </svg>
);
