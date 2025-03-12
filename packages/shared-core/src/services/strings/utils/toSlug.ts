export function toSlug(str: string) {
  return str
    .replaceAll(" ", "-")
    .replace(/[^a-z0-9-]/gi, "")
    .toLocaleLowerCase();
}
