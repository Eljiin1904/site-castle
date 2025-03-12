import { SVGProps } from "react";

export const SvgBook = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1.4.1 7 2.5v13.2L.6 12.9c-.4-.1-.6-.5-.6-.9V1C0 .7.2.4.4.2c.3-.2.7-.3 1-.1Zm13.3 0c.3-.1.6-.1.9.1.2.2.4.5.4.8v11.1c0 .4-.2.7-.6.9L9 15.7V2.5L14.7.1Z"
      clipRule="evenodd"
    />
  </svg>
);
