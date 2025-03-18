import { SVGProps } from "react";

export const SvgSupport = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path d="M4.5 7C2 7 0 9 0 11.5C0 14 2 16 4.5 16C5.3 16 6 15.7 6 14.9V8.1C6 7.5 5.5 7 4.5 7Z" clipRule="evenodd" fillRule="evenodd" fill="currentColor"/>
    <path d="M11.5 7C10.7 7 10 7.3 10 8.1V15C10 15.5 10.5 16.1 11.5 16.1C14 16.1 16 14.1 16 11.6C16 9.1 14 7 11.5 7Z" clipRule="evenodd" fillRule="evenodd" fill="currentColor"/>
    <path d="M3 5.2V5C3 3.3 4.3 2 6 2H10C11.7 2 13 3.3 13 5V5.2C13.7 5.4 14.4 5.7 15 6V5C15 2.2 12.8 0 10 0H6C3.2 0 1 2.2 1 5V6C1.6 5.6 2.3 5.4 3 5.2Z" clipRule="evenodd" fillRule="evenodd" fill="currentColor"/>
  </svg>
);

