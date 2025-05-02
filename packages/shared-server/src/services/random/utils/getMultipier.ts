import crypto from "crypto";

/**
 * Get the multiplier for a given server seed, client seed and nonce.
 * The multiplier is calculated using the SHA256 hash of the server seed, client seed and nonce.
 * The first 8 characters of the hash are used to create a number.
 * The number is then divided by the maximum value of a 32 bit integer to get a value between 0 and 1.
 * Since the random number is uniformly distributed, the output follows a uniform distribution over
 * the range [0, 1].This means the probability of getting a random number between 0 and 0.5 is 50%,
 * the probability of getting a random number between 0 and 0.05 is 5%, and the probability of getting
 * a random number between 0 and 0.01 is 1%.
 * The multiplier is then calculated by dividing 1 by the result.
 * This formula ensures that higher multipliers are less likely to be generated because smaller random 
 * numbers produce larger multipliers. Since the random number is uniformly distributed, this inversion
 * scales the distribution of multipliers to be more uniform.
 * @param param0 serverSeed
 * @param param0 clientSeed
 * @param param0 nonce
 * @returns 
 */
export function getMultiplier({
  serverSeed,
  clientSeed,
  nonce
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
  const number = Math.abs(Number.parseInt(subHash, 16));
  const maxInt32 = Math.pow(2, 32) - 1;
  const result = Math.abs(number) / maxInt32;
  const multiplier = 1 / result;
  return multiplier;
}