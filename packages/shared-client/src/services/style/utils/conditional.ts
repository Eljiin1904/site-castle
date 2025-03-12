export function conditional<K extends string | number, V extends string | Unit>(
  key: K,
  options: { [key in K]: V },
) {
  return options[key] as V;
}
