import { LimboRoll } from "@core/types/limbo/LimboRoll";
import { Numbers } from "@core/services/numbers";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Limbo } from "#app/services/limbo";
import classNames from "classnames";
import './LimboHistoryCard.scss';

export const LimboHistoryCard = ({ roll }: { roll: LimboRoll }) => {
  const { targetValue, rollValue, rollMultiplier } = roll;
  const isWin = Limbo.isWin({ targetValue, rollValue });

  return (
    <Div
      className={classNames("LimboHistoryCard", { win: isWin })}
      center
      py={6}
      px={12}
    >
      <Span
       size={12}  
      >
        {`${Numbers.floor(rollMultiplier, 2).toFixed(2)}X`}
      </Span>
    </Div>
  );
};