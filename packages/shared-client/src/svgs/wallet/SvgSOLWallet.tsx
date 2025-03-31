import { SVGProps } from "react";

export const SvgSOLWallet = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <circle
      cx={10}
      cy={10}
      r={10}
      fill="#151515"
    />
    <path
      fill="url(#SvgSOL-a)"
      d="M13.96 7.56a.289.289 0 0 1-.116.08.337.337 0 0 1-.14.028h-9.06c-.32 0-.484-.4-.26-.64l1.488-1.58a.325.325 0 0 1 .12-.084.337.337 0 0 1 .14-.028h9.096c.324 0 .484.404.256.644L13.96 7.56Zm0 7.064a.364.364 0 0 1-.256.108h-9.06c-.32 0-.484-.392-.26-.624l1.488-1.544a.302.302 0 0 1 .12-.08.337.337 0 0 1 .14-.028h9.096c.324 0 .484.396.256.628l-1.524 1.54Zm0-5.62a.364.364 0 0 0-.256-.108h-9.06c-.32 0-.484.392-.26.624l1.488 1.544a.302.302 0 0 0 .12.08c.044.02.092.028.14.028h9.096c.324 0 .484-.396.256-.628l-1.524-1.54Z"
    />
    <defs>
      <linearGradient
        id="SvgSOL-a"
        x1={4.972}
        x2={14.87}
        y1={14.849}
        y2={5.213}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#CF41E8" />
        <stop
          offset={1}
          stopColor="#10F2B0"
        />
      </linearGradient>
    </defs>
  </svg>
);
