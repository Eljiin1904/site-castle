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
 * @param param0 serverHash
 * @param param0 clientHash
 * @param param0 nonce
 * @returns 
 */
export function getMultiplier({
  serverHash,
  clientHash,
  maxValue
}: {
  serverHash: string;
  clientHash: string;
  maxValue: number;
}) {
  
  const hash = crypto.createHmac("sha256", serverHash).update(clientHash).digest("hex");
  const subHash = hash.substring(0, 8); 
  const number = Math.abs(Number.parseInt(subHash, 16));
  const maxInt32 = Math.pow(2, 32);
  
  //House Edge is 4%
 
  //const multiplier = (1 - 0.04) / result;
  const multiplier =  Math.max(1, (maxInt32/ (number + 1)) * (1 - 0.04));
  const truncatedMultiplier = Math.trunc(multiplier * 100) / 100;
  return Math.max(1, truncatedMultiplier > maxValue ? maxValue : truncatedMultiplier);
}

//My previous multiplier was:
// const result = Math.abs(number) / maxInt32;
// const multiplier = 1 / result;

// My Previous edge was 6%
// 100/6 = 16.666666666666668 = 17
// if(result%17 === 0) 
// multiplier = 1;




//Option 1
// const gameHash = hashChain.pop()

// const hmac = createHmac('sha256', gameHash);

// // blockHash is the hash of bitcoin block 584,500

// hmac.update(blockHash);

// const hex = hmac.digest('hex').substr(0, 8);
// const int = parseInt(hex, 16);

// // 0.01 will result in 1% house edge with a lowest crashpoint of 1

// const crashpoint = Math.max(1, (2 ** 32 / (int + 1)) * (1 - 0.01))

//Option 2
// export function gameResult(vxSignature: Uint8Array, gameHash: Uint8Array) {
//   const nBits = 52; // number of most significant bits to use

//   // 1. HMAC_SHA256(key=signature, message=hash)
//   const hash = bytesToHex(hmac(sha256, vxSignature, gameHash));

//   // 2. r = 52 most significant bits
//   const seed = hash.slice(0, nBits / 4);
//   const r = Number.parseInt(seed, 16);

//   // 3. X = r / 2^52
//   let X = r / Math.pow(2, nBits); // uniformly distributed in [0; 1)

//   // 4. X = 99 / (1 - X)
//   X = 99 / (1 - X); // 1 - X so there's no chance of div-by-zero

//   // 5. return max(trunc(X), 100)
//   const result = Math.floor(X);
//   return Math.max(1, result / 100);
// }