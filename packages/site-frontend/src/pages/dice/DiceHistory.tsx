import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { DiceHistoryCard } from "./DiceHistoryCard";

export const DiceHistory = () => {
  const history = useAppSelector((x) => x.dice.history);
  const reversed = [...history].reverse();
  return (
    <Div
      fx
      justify="flex-end"
      p={16}
      gap={16}
      position="absolute"
      bottom={0}
      zIndex={1}
    >
      {reversed.map((roll, i) => (
        <DiceHistoryCard
          key={i}
          roll={roll}
        />
      ))}
    </Div>
  );
};