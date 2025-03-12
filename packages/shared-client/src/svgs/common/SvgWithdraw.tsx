import { SVGProps } from "react";

export const SvgWithdraw = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M2 2h4V0H2a2 2 0 0 0-2 2v4h2V2Zm12-2h-4v2h4v4h2V2a2 2 0 0 0-2-2Zm-4 14h4v-4h2v4a2 2 0 0 1-2 2h-4v-2Zm-8-4H0v4a2 2 0 0 0 2 2h4v-2H2v-4Zm9.77-2.08a.5.5 0 0 1-.27.08H9v4a1 1 0 1 1-2 0V8H4.5a.5.5 0 0 1-.376-.829l3.5-4a.516.516 0 0 1 .752 0l3.5 4a.5.5 0 0 1-.105.75Z"
      clipRule="evenodd"
    />
  </svg>
);
