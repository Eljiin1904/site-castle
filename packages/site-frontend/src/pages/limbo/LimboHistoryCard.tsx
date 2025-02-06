import { LimboRoll } from "@core/types/limbo/LimboRoll";
import { Numbers } from "@core/services/numbers";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Limbo } from "#app/services/limbo";

export const LimboHistoryCard = ({ roll }: { roll: LimboRoll }) => {
  const { targetValue, rollValue, rollMultiplier } = roll;
  const isWin = Limbo.isWin({ targetValue, rollValue });

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
        {`${Numbers.floor(rollMultiplier, 2).toFixed(2)}x`}
      </Span>
    </Div>
  );
};
