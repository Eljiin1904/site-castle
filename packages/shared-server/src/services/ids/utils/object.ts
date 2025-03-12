import { customAlphabet } from "nanoid";

const idGenerator = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  24,
);

export function object() {
  return idGenerator();
}
