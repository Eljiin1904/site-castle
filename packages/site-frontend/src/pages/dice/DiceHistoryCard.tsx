import { Intimal } from "@core/services/intimal";
import { DiceRoll } from "@core/types/dice/DiceRoll";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Dice } from "#app/services/dice";

export const DiceHistoryCard = ({ roll }: { roll: DiceRoll }) => {
  const { targetKind, targetValue, rollValue } = roll;
  const isWin = Dice.isWin({ targetKind, targetValue, rollValue });

  return (
    <Div
      width={64}
      center
      py={8}
      bg={isWin ? "green" : "brown-5"}
    >
      <Span
        weight="semi-bold"
        color={isWin ? "black" : "gray"}
      >
        {`${Intimal.toLocaleString(rollValue, 2, 2)}`}
      </Span>
    </Div>
  );
};
