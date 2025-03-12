import { SVGProps } from "react";

export const SvgHourglass = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M2 0h12v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V0Zm1 16H2v-1a1 1 0 0 1 1-1v-2.838A4 4 0 0 1 4.55 8 4 4 0 0 1 3 4.838V3h2v1.838c0 .054.002.108.007.162h5.986c.005-.054.007-.108.007-.162V3h2v1.838A4 4 0 0 1 11.45 8 4 4 0 0 1 13 11.162V14a1 1 0 0 1 1 1v1H3Zm3.368-6.735A1.31 1.31 0 0 0 7.279 8h1.442c0 .531.304 1.062.911 1.265A2 2 0 0 1 10.993 11H5.007a2 2 0 0 1 1.36-1.735Z"
      clipRule="evenodd"
    />
  </svg>
);
