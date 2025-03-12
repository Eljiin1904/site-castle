export function mask(str: string, start: number = 0) {
  if (str.length <= start) {
    return str;
  }

  return str.slice(0, start) + "*".repeat(str.length - start);
}
