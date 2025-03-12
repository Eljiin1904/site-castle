import { customAlphabet } from "nanoid";

const idGenerator = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 12);

export function short() {
  return idGenerator();
}
