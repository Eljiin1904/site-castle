export function hasVal<T>(val: T | null | undefined): val is T {
  if (typeof val == "string" && val == "") return false;
  return val != null && val != undefined;
}
