import { customAlphabet } from "nanoid";

const idGenerator = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 16);

export function ticket() {
  const str = idGenerator();
  return `${str.substring(0, 5)}-${str.substring(5, 12)}-${str.substring(12, 16)}`;
}
