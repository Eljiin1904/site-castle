export function toShortTimestamp(date: Date, options?: Intl.DateTimeFormatOptions) {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    hour12: true,
    minute: "numeric",
    day: "numeric",
    month: "short",
  };
  return date.toLocaleDateString("en-US", { ...defaultOptions, ...options });
}
