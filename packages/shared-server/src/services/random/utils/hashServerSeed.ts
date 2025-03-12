import crypto from "crypto";

export function hashServerSeed(serverSeed: string) {
  return crypto.createHash("sha256").update(serverSeed).digest("base64");
}
