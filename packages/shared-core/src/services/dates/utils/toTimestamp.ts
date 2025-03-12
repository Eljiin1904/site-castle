export function toTimestamp(date: Date, options?: Intl.DateTimeFormatOptions) {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    hour12: false,
    minute: "numeric",
    weekday: "short",
    day: "numeric",
    month: "short",
  };
  return date.toLocaleDateString("en-US", { ...defaultOptions, ...options });
}
