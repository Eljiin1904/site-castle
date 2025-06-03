export const getBaseXpMultiplier = (edgeRate: number): number => {
  return 1 / edgeRate; // Do we need to round here?
};
