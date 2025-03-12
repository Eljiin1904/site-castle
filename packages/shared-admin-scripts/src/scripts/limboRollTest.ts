import { Intimal } from "@core/services/intimal";
import { Numbers } from "@core/services/numbers";
import { Limbo } from "@server/services/limbo";
import { Ids } from "@server/services/ids";
import { Random } from "@server/services/random";

export async function limboRollTest() {
  const maxValue = Limbo.maxValue;
  const iterations = 100000000;
  const serverSeed = Ids.secret();
  const clientSeed = Ids.secret();
  const betAmount = Intimal.fromDecimal(10);
  const { min, max } = Limbo.getTargetMinMax();

  let totalBet = 0;
  let totalWon = 0;

  for (let i = 0; i < iterations; i++) {
    const targetValue = Numbers.randomInt(min, max);

    const rollValue = Random.getRoll({
      serverSeed,
      clientSeed,
      nonce: i,
      maxValue,
    });

    totalBet += betAmount;

    const won = Limbo.isWin({
      targetValue,
      rollValue,
    });

    if (won) {
      const multiplier = Limbo.getMultiplier({
        targetValue,
      });

      totalWon += Math.round(betAmount * multiplier);
    }
  }

  console.log("------------");
  console.log(totalWon / totalBet);
  console.log("------------");
}
