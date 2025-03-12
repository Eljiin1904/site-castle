import { SVGProps } from "react";

export const SvgSpinner = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 64 64"
    {...props}
  >
    <path
      fill="none"
      stroke="var(--brown-4-color)"
      strokeMiterlimit={10}
      strokeWidth={4}
      d="M58.61 18.13C60.78 22.28 62 27 62 32c0 16.57-13.43 30-30 30S2 48.57 2 32c0-4.96 1.2-9.63 3.33-13.75"
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeMiterlimit={10}
      strokeWidth={4}
      d="M5.33 18.25C10.32 8.6 20.39 2 32 2s21.6 6.54 26.61 16.13"
    />
  </svg>
);
