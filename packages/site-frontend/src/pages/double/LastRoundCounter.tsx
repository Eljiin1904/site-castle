import { DoubleColor } from "@core/types/double/DoubleColor";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { DoubleIcon } from "./DoubleIcon";

export const LastRoundCounter = ({ color, bait }: { color: DoubleColor; bait: boolean }) => {
  const history = useAppSelector((x) => x.double.history);

  const matches = history.filter((roll) => {
    if (bait) {
      return roll.color === color && roll.bait === bait;
    } else {
      return roll.color === color;
    }
  });

  return (
    <Div alignItems="center" gap={4}>
      <DoubleIcon
        color={color}
        bait={bait}
        last100={true}
      />
      <Span
        size={12}
        weight="semi-bold"
      >
        {matches.length.toString().padStart(2, "0")}
      </Span>
    </Div>
  );
};
