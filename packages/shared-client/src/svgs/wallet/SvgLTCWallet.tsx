import { SVGProps } from "react";

export const SvgLTCWallet = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 40 40"
    {...props}
  >
    <circle
      cx={20}
      cy={20}
      r={14.5}
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        fill: "#fff",
      }}
    />
    <path
      d="M40 20c0 11-9 20-20 20S0 31 0 20 9 0 20 0s20 9 20 20zm-25.8.8L17 10h6l-2.1 8.4 2.8-1.2-.7 2.7-2.8 1-1.4 5.3h9.9l-.9 3.8H11.9l1.6-6.5-2.3 1 .7-2.7 2.3-1z"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        fill: "#345e9d",
      }}
    />
  </svg>
);
