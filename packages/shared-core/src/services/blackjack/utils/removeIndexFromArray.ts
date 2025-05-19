export function removeIndexFromArray<T>(arr: T[], index: number) {
  const item = arr.splice(index, 1)[0];
  if (!item) throw new Error("Item not found");
  return item;
}
