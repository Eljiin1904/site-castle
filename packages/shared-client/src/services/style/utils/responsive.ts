const map = {
  mobile: 0,
  tablet: 1,
  laptop: 2,
  desktop: 3,
};

export function responsive<T extends string | Unit>(
  layout: Layout,
  values: [mobile: T, tablet: T, laptop: T, desktop: T],
): T {
  return values[map[layout]];
}
