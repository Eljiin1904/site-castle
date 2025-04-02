import { Intimal } from "@core/services/intimal";
import { DiceRoll } from "@core/types/dice/DiceRoll";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Dice } from "#app/services/dice";
import classNames from "classnames";
import './DiceHistoryCard.scss';

export const DiceHistoryCard = ({ roll }: { roll: DiceRoll }) => {
  const { targetKind, targetValue, rollValue } = roll;
  const isWin = Dice.isWin({ targetKind, targetValue, rollValue });

  return (
    <Div
      className={classNames("DiceHistoryCard", { win: isWin })}
      center
      py={6}
      px={12}
    >
      <Span
        size={12}       
      >
        {`${Intimal.toLocaleString(rollValue, 2, 2)}`}X
      </Span>
    </Div>
  );
};