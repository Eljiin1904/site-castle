import { customAlphabet } from "nanoid";

const idGenerator = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 18);

export function long() {
  return idGenerator();
}
