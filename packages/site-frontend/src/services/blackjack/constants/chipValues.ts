// export const chipValues = [10, 100, 500, 2500, 10000, 100000] as const;
export const chipValues = [0.1, 1, 5, 25, 100, 1000] as const;

export type ChipValue = (typeof chipValues)[number];
