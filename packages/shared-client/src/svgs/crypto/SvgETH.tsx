import { SVGProps } from "react";

export const SvgETH = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 40 40"
    {...props}
  >
    <circle
      cx={20}
      cy={20}
      r={20}
      style={{
        fill: "#627eea",
        strokeWidth: 0,
      }}
    />
    <path
      d="M20.62 5v11.09l9.37 4.18L20.62 5z"
      style={{
        fill: "rgba(255,255,255,.6)",
        strokeWidth: 0,
      }}
    />
    <path
      d="m20.62 5-9.37 15.27 9.37-4.18V5z"
      style={{
        fill: "#fff",
        strokeWidth: 0,
      }}
    />
    <path
      d="M20.62 27.46v7.53L30 22.02l-9.38 5.44z"
      style={{
        fill: "rgba(255,255,255,.6)",
        strokeWidth: 0,
      }}
    />
    <path
      d="M20.62 34.99v-7.53l-9.37-5.44 9.37 12.97z"
      style={{
        fill: "#fff",
        strokeWidth: 0,
      }}
    />
    <path
      d="m20.62 25.71 9.37-5.44-9.37-4.18v9.62z"
      style={{
        fill: "rgba(255,255,255,.2)",
        strokeWidth: 0,
      }}
    />
  </svg>
);
