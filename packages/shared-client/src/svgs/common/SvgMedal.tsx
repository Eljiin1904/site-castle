import { SVGProps } from "react";

export const SvgMedal = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M7.35 4.033 5.333 0H.667l2.866 5.733a6.636 6.636 0 0 1 3.817-1.7Zm1.3 0L10.667 0h4.666l-2.866 5.733a6.636 6.636 0 0 0-3.817-1.7Zm-3.613 2.2a5.333 5.333 0 1 1 5.926 8.868 5.333 5.333 0 0 1-5.926-8.869ZM8 12.254l1.567.824-.3-1.746 1.269-1.236-1.752-.254L8 8.255l-.781 1.588-1.752.254 1.266 1.236-.3 1.746L8 12.255Z"
      clipRule="evenodd"
    />
  </svg>
);
