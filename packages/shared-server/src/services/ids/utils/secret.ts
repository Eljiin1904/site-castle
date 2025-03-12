import crypto from "crypto";

export function secret() {
  return crypto.randomBytes(16).toString("hex");
}
