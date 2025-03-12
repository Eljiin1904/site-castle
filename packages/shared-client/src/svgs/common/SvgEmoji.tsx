import { SVGProps } from "react";

export const SvgEmoji = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8Zm2 5c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1ZM6 5c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1Zm5.8 5.3C11.2 11.9 9.7 13 8 13c-1.7 0-3.2-1.1-3.8-2.7-.2-.5.1-1.1.6-1.2.5-.2 1.1.1 1.3.6.3.8 1.1 1.3 1.9 1.3.8 0 1.6-.5 1.9-1.3.2-.5.8-.8 1.3-.6.5.1.8.7.6 1.2Z"
    />
  </svg>
);
