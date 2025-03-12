import { customAlphabet } from "nanoid";

const tokenGenerator = customAlphabet("0123456789", 6);

export function code() {
  return tokenGenerator();
}
