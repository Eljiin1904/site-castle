import { SVGProps } from "react";

export const SvgKey = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M15.5 0h-2.591a.501.501 0 0 0-.356.149L6.534 6.265A4.934 4.934 0 0 0 5 6a5 5 0 1 0 5 5c0-.567-.115-1.103-.289-1.612l1.156-1.244a.499.499 0 0 0 .134-.34V6h1.5a.5.5 0 0 0 .5-.5V4h1.793c.133 0 .26-.053.354-.146l.707-.707a.5.5 0 0 0 .146-.354V.5a.5.5 0 0 0-.5-.5H15.5Zm-11 12a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 4.5 12Z"
    />
  </svg>
);
