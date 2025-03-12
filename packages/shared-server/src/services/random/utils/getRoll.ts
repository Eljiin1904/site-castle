import crypto from "crypto";

export function getRoll({
  serverSeed,
  clientSeed,
  nonce,
  minValue = 1,
  maxValue,
}: {
  serverSeed: string;
  clientSeed: number | string;
  nonce: number | string;
  minValue?: number;
  maxValue: number;
}) {
  const seed = `${serverSeed}-${clientSeed}-${nonce}`;
  const hash = crypto.createHmac("sha256", seed).digest("hex");
  const subHash = hash.substring(0, 8);
  const number = Number.parseInt(subHash, 16);
  return minValue + (Math.abs(number) % maxValue);
}
