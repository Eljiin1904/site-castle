import { ChipValue, chipValues } from "#app/services/blackjack/constants/chipValues";
import { Intimal } from "#core/services/intimal";

export function getChipValsFromAmount(amount: number) {
  const stack: ChipValue[] = [];
  const values = chipValues
    .slice()
    .reverse()
    .map((val) => Intimal.fromDecimal(val));

  values.forEach((value) => {
    while (amount >= value) {
      stack.push(Intimal.toDecimal(value) as ChipValue);
      amount -= value;
    }
  });
  return stack;
}
