import { subDays } from "date-fns";

type DateFilterParams = {
  dateFilterType?: "today" | "yesterday";
  year?: number;
  month?: number;
  days?: number;
};

export function buildDateFilter(params: DateFilterParams) {
  const { dateFilterType, year, month, days } = params;
  const now = new Date();

  if (dateFilterType === "today") {
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return { $gte: startOfToday.toISOString(), $lt: startOfTomorrow.toISOString() };
  }

  if (dateFilterType === "yesterday") {
    const startOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return { $gte: startOfYesterday.toISOString(), $lt: startOfToday.toISOString() };
  }

  if (year && month) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);
    return { $gte: startDate.toISOString(), $lt: endDate.toISOString() };
  }

  if (year) {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);
    return { $gte: startDate.toISOString(), $lt: endDate.toISOString() };
  }

  if (days) {
    const startDate = subDays(now, days);
    return { $gte: startDate.toISOString() };
  }

  return null;
}
