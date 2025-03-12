export function toFullDateString(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    day: "numeric",
    month: "numeric",
    year: "2-digit",
    hour12: false,
  });
}
