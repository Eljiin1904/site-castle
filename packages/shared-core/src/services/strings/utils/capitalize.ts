/**
 * Converts first char in string to upper case.
 */
export function capitalize(str: string) {
  if (!str) {
    return "";
  }
  return str.replace(
    /\w\S*/g,
    (x) => x.charAt(0).toUpperCase() + x.substring(1),
  );
}
