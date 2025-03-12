import { SVGProps } from "react";

export const SvgTransaction = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12.6 5H1c-.6 0-1-.4-1-1s.4-1 1-1h11.6l-1.3-1.3c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l3 3c.4.4.4 1 0 1.4l-3 3c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4L12.6 5Zm-9.2 6H15c.6 0 1 .4 1 1s-.4 1-1 1H3.4l1.3 1.3c.4.4.4 1 0 1.4-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3l-3-3c-.4-.4-.4-1 0-1.4l3-3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L3.4 11Z"
      clipRule="evenodd"
    />
  </svg>
);
