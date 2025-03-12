import { SVGProps } from "react";

export const SvgCrosshair = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <g fill="currentColor">
      <path d="M8 8.8a.8.8 0 1 0 0-1.6.8.8 0 0 0 0 1.6Z" />
      <path
        fillRule="evenodd"
        d="M14.35 7.2A6.403 6.403 0 0 0 8.8 1.65V0H7.2v1.65A6.403 6.403 0 0 0 1.65 7.2H0v1.6h1.65a6.403 6.403 0 0 0 5.55 5.55V16h1.6v-1.65a6.403 6.403 0 0 0 5.55-5.55H16V7.2h-1.65ZM8.8 4.8V3.266A4.804 4.804 0 0 1 12.734 7.2H11.2v1.6h1.534A4.804 4.804 0 0 1 8.8 12.734V11.2H7.2v1.534A4.804 4.804 0 0 1 3.266 8.8H4.8V7.2H3.266A4.804 4.804 0 0 1 7.2 3.266V4.8h1.6Z"
        clipRule="evenodd"
      />
    </g>
  </svg>
);
