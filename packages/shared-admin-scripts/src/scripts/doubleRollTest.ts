import { Double } from "@server/services/double";
import { Ids } from "@server/services/ids";
import { Random } from "@server/services/random";

export async function doubleRollTest() {
  const iterations = 1000000;
  const serverSeed = Ids.secret();
  const clientSeed = Ids.secret();

  const results = {
    red: 0,
    black: 0,
    green: 0,
    bait: 0,
  };

  for (let i = 0; i < iterations; i++) {
    const roll = Random.getRoll({
      serverSeed,
      clientSeed,
      nonce: i,
      maxValue: 15,
    });

    results[Double.getColor(roll)]++;
  }

  console.log({
    red: results.red / iterations,
    black: results.black / iterations,
    green: results.green / iterations,
    bait: results.bait / iterations,
  });
}
