import { Intimal } from "@core/services/intimal";
import { Numbers } from "@core/services/numbers";
import { Dice } from "@server/services/dice";
import { Ids } from "@server/services/ids";
import { Random } from "@server/services/random";

export async function diceRollTest() {
  const maxValue = Dice.maxValue;
  const iterations = 10000000;
  const serverSeed = Ids.secret();
  const clientSeed = Ids.secret();
  const targetKind = "over";
  const betAmount = Intimal.fromDecimal(10);
  const { min, max } = Dice.getTargetMinMax(targetKind);

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

    const won = Dice.isWin({
      targetKind,
      targetValue,
      rollValue,
    });

    if (won) {
      const multiplier = Dice.getMultiplier({
        targetKind,
        targetValue,
      });

      totalWon += Math.round(betAmount * multiplier);
    }
  }

  console.log("------------");
  console.log(totalWon / totalBet);
  console.log("------------");
}
