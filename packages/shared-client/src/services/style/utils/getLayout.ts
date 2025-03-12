import { breakpoints } from "../constants/breakpoints";

export function getLayout(width: number) {
  let layout: Layout;

  if (width >= breakpoints.desktop) {
    layout = "desktop";
  } else if (width >= breakpoints.laptop) {
    layout = "laptop";
  } else if (width >= breakpoints.tablet) {
    layout = "tablet";
  } else {
    layout = "mobile";
  }

  return layout;
}
