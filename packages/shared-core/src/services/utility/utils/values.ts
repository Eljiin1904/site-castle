export function values<T extends object, K extends keyof T>(obj: T): T[K][] {
  return Object.values(obj) as T[K][];
}
