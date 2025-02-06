import { SVGProps } from "react";

export const SvgSliderHandle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 27 28"
    fill="none"
    {...props}
  >
    <rect
      width={27}
      height={28}
      fill="#F1FDFF"
      rx={4}
    />
    <path
      stroke="#9599A3"
      d="M8.5 9v11M18.5 9v11M13.5 9v11"
    />
  </svg>
);
