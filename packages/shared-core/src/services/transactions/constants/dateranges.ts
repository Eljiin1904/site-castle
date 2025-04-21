export const dateranges = [
  "all",
  "today",
  "yesterday",
  "last7Days",
  "thisMonth",
  "lastMonth",
  "last3Months",
  "last6Months",
  "thisYear",
  "lastYear"
] as const;

export type DateRangeType = (typeof dateranges)[number];