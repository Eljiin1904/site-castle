import { Ids } from "@server/services/ids";
import { Random } from "@server/services/random";

export async function rollTest() {
  const maxValue = 10000;
  const iterations = 100000000;
  const serverSeed = Ids.secret();
  const clientSeed = Ids.secret();

  const results = Array(maxValue + 1).fill(0);

  for (let i = 0; i < iterations; i++) {
    const roll = Random.getRoll({
      serverSeed,
      clientSeed,
      nonce: i,
      maxValue,
    });

    results[roll] += 1;
  }

  console.log("------------");

  console.log(`Zero: ${results[0]}`);
  console.log(`One: ${results[1]}`);
  console.log(`Max: ${results[maxValue]}`);

  console.log("------------");

  const base = iterations / maxValue;

  for (let i = 1; i <= maxValue; i++) {
    const result = results[i];
    const variance = Math.abs(1 - result / base);

    if (variance > 0.1) {
      console.log(`${i}: ${result}`);
    }
  }
}
